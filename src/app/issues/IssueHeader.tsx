import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssueHeader() {
  return (
    <div className="mb-5">
      <Link href="/issues/new">
        <Button className="cursor-pointer">New Issue</Button>
      </Link>
    </div>
  );
}
