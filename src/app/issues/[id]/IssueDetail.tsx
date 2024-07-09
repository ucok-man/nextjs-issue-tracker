import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Props = {
  issue: Issue;
};

export default function IssueDetail({ issue }: Props) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex align="center" gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose prose-sm max-w-full" mt="5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>{" "}
    </>
  );
}
