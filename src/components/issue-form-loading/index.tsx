import { Box } from "@radix-ui/themes";
import Skeleton from "../skeleton";

export default function IssueFormLoading() {
  return (
    <Box className="max-w-2xl space-y-3">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
