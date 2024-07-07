import prisma from "@db/client";
import { Box, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

type Props = {
  params: { id: string };
};

export default async function EditIssuePage({ params }: Props) {
  const validId = parseInt(params.id);
  if (!validId) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (!issue) notFound();
  console.log({ issue });

  return (
    <Box>
      <Heading as="h1" className="mb-4">
        Edit Issue
      </Heading>
      <IssueForm issue={issue} />
    </Box>
  );
}
