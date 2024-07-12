// import { auth } from "@/auth";
// import { NextResponse, type NextRequest } from "next/server";
export {auth as middleware} from "@/auth";

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   if (!session?.user)
//     return NextResponse.redirect(new URL("/api/auth/signin", request.url));
// }

export const config = {
    matcher: ["/issues/:id+/edit", "/issues/new"],
};
