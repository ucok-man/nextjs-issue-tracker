import delay from "@/utils/delay";
import { Box, Heading } from "@radix-ui/themes";
// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import IssueFormLoading from "../_components/IssueFormLoading";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

export default async function NewIssuePage() {
  await delay(2);
  return (
    <Box className="max-w-2xl">
      <Heading as="h1" className="mb-4">
        Create New Issue
      </Heading>
      <IssueForm action="create" />
    </Box>
  );
}
