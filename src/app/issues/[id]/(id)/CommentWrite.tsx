"use client";

import { SimpleMDE, SimpleMDEOptions } from "@/components";
import { Avatar, Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { useMemo } from "react";

type Props = {};

export default function CommentWrite({}: Props) {
  const simpleMdeOption = useMemo<SimpleMDEOptions>(
    () => ({
      status: false,
      minHeight: "4rem",
    }),
    []
  );

  return (
    <Card>
      <Flex gap="3" align="center" mb={"2"}>
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="?"
        />
        <Text as="div" size="2" weight={"medium"}>
          Add a Comment
        </Text>
      </Flex>
      <Separator size={"4"} />
      <form className="mt-2 text-base">
        <SimpleMDE
          placeholder="Write your comment here..."
          options={simpleMdeOption}
        />
        <Flex direction={"row-reverse"}>
          <Button className="cursor-pointer mt-2 text-sm">Comment</Button>
        </Flex>
      </form>
    </Card>
  );
}
