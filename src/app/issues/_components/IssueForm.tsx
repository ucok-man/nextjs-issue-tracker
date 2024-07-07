"use client";

import { ErrorMsg, Spinner } from "@/components";
import { issueFormInputValidation } from "@/types/issueFormInputValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormInput = z.infer<typeof issueFormInputValidation>;

type Props = {
  issue?: Issue;
  action: "create" | "update";
};

export default function IssueForm({ issue, action }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormInput>({
    resolver: zodResolver(issueFormInputValidation),
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitform = async (data: IssueFormInput) => {
    try {
      setIsSubmitting(true);

      if (action == "create") await axios.post("/api/issues", data);
      if (action == "update")
        await axios.patch(`/api/issues/${issue?.id}`, data);

      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        "Unexpected error has occured. Please check your submission!"
      );
    }
  };

  return (
    <Box className="max-w-xl space-y-3">
      {submitError && (
        <Callout.Root color="red">
          <Callout.Text>{submitError}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => await submitform(data))}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />
        <ErrorMsg>{errors.title?.message}</ErrorMsg>

        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SimpleMDE
              placeholder="Description"
              // {...field}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <ErrorMsg>{errors.description?.message}</ErrorMsg>
        <Button className="cursor-pointer" disabled={isSubmitting}>
          Submit {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
}
