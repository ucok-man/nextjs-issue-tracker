"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button className="cursor-pointer">Submit</Button>
      </form>
    </div>
  );
}
