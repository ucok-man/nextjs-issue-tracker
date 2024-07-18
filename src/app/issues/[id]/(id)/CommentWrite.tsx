"use client";

import { SimpleMDE, SimpleMDEOptions } from "@/components";
import { createCommentDTO } from "@/types/commentDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type CommentFormInput = z.infer<typeof createCommentDTO>;

type Props = {};

export default function CommentWrite({}: Props) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInput>({
    resolver: zodResolver(createCommentDTO),
  });

  const simpleMdeOption = useMemo<SimpleMDEOptions>(
    () => ({
      status: false,
      minHeight: "4rem",
    }),
    []
  );

  const submitForm = async (data: CommentFormInput) => {
    try {
      await axios.post("/api/comments", data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Flex gap="3" align="center" mb={"2"}>
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="?"
        />
        <Text as="div" size="2" weight={"bold"} color="violet">
          Add a Comment
        </Text>
      </Flex>
      <form
        className="mt-2 text-base"
        onSubmit={handleSubmit((data) => submitForm(data))}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Write your comment here..."
              options={simpleMdeOption}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Flex direction={"row-reverse"}>
          <Button className="cursor-pointer mt-2 text-sm">Comment</Button>
        </Flex>
      </form>
    </Card>
  );
}
