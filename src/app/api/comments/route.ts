import { auth } from "@/auth";
import { createCommentDTO } from "@/types/commentDTO";
import prisma from "@db/client";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth?.user)
    return NextResponse.json(
      { error: { message: "Not authenticated" } },
      { status: 401 }
    );

  const input = await req.json();
  const { error, data: validInput } = createCommentDTO.safeParse(input);
  if (error) {
    return NextResponse.json({ error: error.format() }, { status: 400 });
  }

  const issue = await prisma.comment.create({
    data: {
      description: validInput.description,
      authorId: req.auth.user.id!,
      issueId: input.issueId,
    },
  });

  const response = { data: issue };
  return NextResponse.json(response, {
    status: 201,
  });
});
