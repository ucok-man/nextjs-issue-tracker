import Skeleton from "@/components/Skeleton";
import { Box } from "@radix-ui/themes";

export default function IssueFormLoading() {
  return (
    <Box className="max-w-2xl space-y-3">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
