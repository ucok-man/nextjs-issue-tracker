import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssuesPage() {
  return (
    <div>
      <Link href="/issues/new">
        <Button className="cursor-pointer">New Issue</Button>
      </Link>
    </div>
  );
}
