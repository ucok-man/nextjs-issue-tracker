import { auth } from "@/auth";
import SectionSparator from "@/components/SectionSparator";
import prisma from "@db/client";
import { Box, Flex, Grid, Separator } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import CommentDisplay from "./CommentDisplay";
import CommentWrite from "./CommentWrite";
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
    <>
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
      <Grid columns={{ initial: "1", md: "5" }} gap="5" className="mb-5">
        <Box className="lg:col-span-4">
          <SectionSparator>Comments Section</SectionSparator>
          <CommentDisplay />
          <Separator className="w-full mb-5 h-1 bg-gray-200" />
          <CommentWrite issueId={validId} />
        </Box>
      </Grid>
    </>
  );
}
