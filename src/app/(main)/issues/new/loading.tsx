import IssueFormLoading from "@/components/issue-form-loading";
import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

export default function LoadingIssueNewPage() {
  return (
    <Box>
      <Skeleton className="max-w-2xl mb-4 h-7" />
      <IssueFormLoading />
    </Box>
  );
}
