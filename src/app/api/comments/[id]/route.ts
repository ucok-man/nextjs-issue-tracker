import { auth } from "@/auth";
import prisma from "@db/client";
import { NextResponse } from "next/server";

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

  const comment = await prisma.comment.findUnique({
    where: { id: validId },
  });
  if (comment === null) {
    return NextResponse.json(
      { error: { message: "The requested resources cannot be found" } },
      { status: 404 }
    );
  }

  const deleted = await prisma.comment.delete({
    where: { id: validId },
  });

  const response = { data: deleted };
  return NextResponse.json(response, {
    status: 200,
  });
});
