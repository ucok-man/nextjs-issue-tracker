import { auth } from "@/auth";
import { updateIssueDTO } from "@/types/issueDTO";
import prisma from "@db/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = auth(async function PATCH(req, ctx) {
  // is login?
  if (!req.auth)
    return NextResponse.json(
      { error: { message: "Not authenticated" } },
      { status: 401 }
    );

  // validate id this must be number
  const validId = parseInt(ctx.params?.id as string);
  if (!validId)
    return NextResponse.json(
      { error: { message: "The id must be number and greater than 0" } },
      { status: 400 }
    );

  // validate body
  const input = await req.json();
  const { error, data: validInput } = updateIssueDTO.safeParse(input);
  if (error) {
    return NextResponse.json({ error: error.format() }, { status: 400 });
  }

  // find old issue
  const oldIssue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (oldIssue === null) {
    return NextResponse.json(
      { error: { message: "The requested resources cannot be found" } },
      { status: 404 }
    );
  }

  // update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: validId },
    data: {
      title: validInput.title || oldIssue.title,
      description: validInput.description || oldIssue.description,
      assignedToId: validInput.assignedToId,
      status: validInput.status || oldIssue.status,
    },
  });

  revalidatePath("/issues");
  revalidatePath("/");

  const response = { data: updatedIssue };
  return NextResponse.json(response, {
    status: 200,
  });
});

export const DELETE = auth(async function DELETE(req, ctx) {
  if (!req.auth)
    return NextResponse.json(
      { error: { message: "Not authenticated" } },
      { status: 401 }
    );

  const validId = parseInt(ctx.params?.id as string);
  if (!validId)
    return NextResponse.json(
      { error: { message: "The id must be number and greater than 0" } },
      { status: 400 }
    );

  const oldIssue = await prisma.issue.findUnique({
    where: { id: validId },
  });
  if (oldIssue === null) {
    return NextResponse.json(
      { error: { message: "The requested resources cannot be found" } },
      { status: 404 }
    );
  }

  const updatedIssue = await prisma.issue.delete({
    where: { id: validId },
  });

  const response = { data: updatedIssue };
  return NextResponse.json(response, {
    status: 200,
  });
});
