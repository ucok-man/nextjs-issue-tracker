import { auth } from "@/auth";
import prisma from "@db/client";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json(
      { error: { message: "Not authenticated" } },
      { status: 401 }
    );

  const users = await prisma.user.findMany();
  const response = { data: users };
  return NextResponse.json(response, {
    status: 201,
  });
});
