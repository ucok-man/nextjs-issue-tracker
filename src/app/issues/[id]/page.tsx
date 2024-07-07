import prisma from "@db/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetail from "./IssueDetail";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const validId = parseInt(params.id);
  if (!validId) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueBtn issueId={issue.id} />
      </Box>
    </Grid>
  );
}
