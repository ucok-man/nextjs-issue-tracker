import prisma from "@db/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const input = await req.json();
  const { error, data } = schema.safeParse(input);
  if (error) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
  const issue = await prisma.issue.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });

  const response = { data: issue };
  return NextResponse.json(response, {
    status: 201,
  });
}
