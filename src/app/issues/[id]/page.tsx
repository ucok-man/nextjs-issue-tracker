import prisma from "@db/client";
import { notFound } from "next/navigation";

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
    <div>
      <div>{issue.title}</div>
      <div>{issue.description}</div>
      <div>{issue.status}</div>
      <div>{issue.createdAt.toDateString()}</div>
    </div>
  );
}
