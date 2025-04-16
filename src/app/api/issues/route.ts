import { auth } from "@/auth";
import { createIssueDTO } from "@/types/issueDTO";
import prisma from "@db/client";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth || !req.auth.user?.id)
    return NextResponse.json(
      { error: { message: "Not authenticated" } },
      { status: 401 }
    );

  const input = await req.json();
  const { error, data: validInput } = createIssueDTO.safeParse(input);
  if (error) {
    return NextResponse.json({ error: error.format() }, { status: 400 });
  }
  const issue = await prisma.issue.create({
    data: {
      title: validInput.title,
      description: validInput.description,
      createdById: req.auth.user.id,
    },
  });

  const response = { data: issue };
  return NextResponse.json(response, {
    status: 201,
  });
});
