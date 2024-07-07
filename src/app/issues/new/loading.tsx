import { Skeleton } from "@/components";
import { Box } from "@radix-ui/themes";

export default function LoadingIssueNewPage() {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
