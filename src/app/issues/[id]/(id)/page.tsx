import { auth } from "@/auth";
import prisma from "@db/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueBtn from "./DeleteIssueBtn";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetail from "./IssueDetail";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const session = await auth();

  const validId = parseInt(params.id);
  if (!validId) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session?.user && (
        <Flex direction="column" gap="2">
          <AssigneeSelect issue={issue} />
          <EditIssueBtn issueId={issue.id} />
          <DeleteIssueBtn issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
}
