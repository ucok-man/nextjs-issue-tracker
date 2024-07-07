import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

export default function LoadingIssueNewPage() {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
