"use client";

import ErrorMsg from "@/components/ErrorMsg";
import { createIssueSchema } from "@/types/createIssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
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
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitError(
        "Unexpected error has occured. Please check your submission!"
      );
    }
  };

  return (
    <div className="max-w-xl space-y-3">
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
              options={{ status: false }}
              {...field}
            />
          )}
        />
        <ErrorMsg>{errors.description?.message}</ErrorMsg>
        <Button className="cursor-pointer">Submit</Button>
      </form>
    </div>
  );
}
