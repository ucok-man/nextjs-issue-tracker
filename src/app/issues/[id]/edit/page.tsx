import prisma from "@db/client";
import { Box, Heading } from "@radix-ui/themes";
import { Metadata } from "next";
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

  return (
    <Box className="max-w-2xl">
      <Heading as="h1" className="mb-4" color="violet">
        Edit This Issue
      </Heading>
      <IssueForm issue={issue} action="update" />
    </Box>
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
    title: `Issue Trakcer | Edit ${issue.title} Issue`,
    description: `Edit this issue ${issue.title}`,
  };
}
