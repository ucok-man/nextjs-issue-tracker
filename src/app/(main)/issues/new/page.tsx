import delay from "@/utils/delay";
import { Box, Heading } from "@radix-ui/themes";
// import IssueForm from "../_components/IssueForm";
import IssueFormLoading from "@/components/issue-form-loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

export default async function NewIssuePage() {
  await delay(2);
  return (
    <Box className="max-w-2xl">
      <Heading as="h1" className="mb-4" color="violet">
        Create New Issue
      </Heading>
      <IssueForm action="create" />
    </Box>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker | Create New",
  description: "Create new issue",
};
