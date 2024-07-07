"use client";

import ErrorMsg from "@/components/ErrorMsg";
import Spinner from "@/components/Spinner";
import { createIssueSchema } from "@/types/createIssueSchema";
import delay from "@/utils/delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default async function NewIssuePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitform = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        "Unexpected error has occured. Please check your submission!"
      );
    }
  };

  await delay(2);

  return (
    <Box className="max-w-xl space-y-3">
      {submitError && (
        <Callout.Root color="red">
          <Callout.Text>{submitError}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => submitform(data))}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMsg>{errors.title?.message}</ErrorMsg>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              // options={{ status: false }} // bug?
              {...field}
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
