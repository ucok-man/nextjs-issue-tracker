"use client";

import { createIssueDTO } from "@/types/issueDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
// import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import ErrorMsg from "../error-msg";
import SimpleMDE from "../simple-mde";
import Spinner from "../spinner";

type IssueFormInput = z.infer<typeof createIssueDTO>;

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
    resolver: zodResolver(createIssueDTO),
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitform = async (data: IssueFormInput) => {
    try {
      setIsSubmitting(true);

      if (action == "create") await axios.post("/api/issues", data);
      if (action == "update")
        await axios.patch(`/api/issues/${issue?.id}`, data);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        "Unexpected error has occured. Please check your submission!"
      );
    }
  };

  return (
    <Box className="max-w-2xl space-y-3">
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
              className="text-base"
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
