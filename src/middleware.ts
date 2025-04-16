export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/issues/:id+/edit", "/issues/new"],
};
