import IssueStatusBadge from "@/components/issue-status-badge";
import prisma from "@db/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

type Props = {};

export default async function LatestIssue({}: Props) {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
    include: {
      assignedTo: true,
    },
  });
  return (
    <Card>
      <Heading size={"4"} mb={"4"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell key={issue.id}>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedTo && (
                    <Avatar
                      src={issue.assignedTo.image!}
                      fallback="?"
                      size={"2"}
                      radius={"full"}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
