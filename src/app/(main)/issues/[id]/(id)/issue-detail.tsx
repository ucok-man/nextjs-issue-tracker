"use client";

import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import StatusSelect from "./status-select";

type Props = {
  issue: Issue;
};

export default function IssueDetail({ issue }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <Heading as="h1">{issue.title}</Heading>
      <Flex align="center" gap="3" my="2">
        {session?.user?.id && (
          <StatusSelect currentId={session.user.id} issue={issue} />
        )}
        <Text className="text-sm">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose prose-headings:text-2xl max-w-full" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
