import { Button } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  issueId: number;
};

export default function DeleteIssueBtn({ issueId }: Props) {
  return (
    <Button color="red">
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
}
