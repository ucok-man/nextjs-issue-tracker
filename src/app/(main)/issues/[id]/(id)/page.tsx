import { auth } from "@/auth";
import SectionSparator from "@/components/section-sparator";
import prisma from "@db/client";
import { Box, Flex, Grid, Separator } from "@radix-ui/themes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AssigneeSelect from "./assignee-select";
import CommentDisplay from "./comment-display";
import CommentWrite from "./comment-write";
import DeleteIssueBtn from "./delete-issue-btn";
import EditIssueBtn from "./edit-issue-btn";
import IssueDetail from "./issue-detail";

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
          <CommentDisplay issueId={validId} />
          <Separator className="w-full mb-5 h-1 bg-gray-200" />
          <CommentWrite issueId={validId} />
        </Box>
      </Grid>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const validId = parseInt(params.id);
  if (!validId) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (!issue) notFound();

  return {
    title: `Issue Trakcer | ${issue.title}`,
    description: `Details of issue ${issue.title}`,
  };
}
