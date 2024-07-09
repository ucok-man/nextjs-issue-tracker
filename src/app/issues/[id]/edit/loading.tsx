import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import IssueFormLoading from "../../_components/IssueFormLoading";

export default function LoadingIssueEditPage() {
  return (
    <Box>
      <Skeleton className="max-w-2xl mb-4 h-7" />
      <IssueFormLoading />
    </Box>
  );
}
