import { Box, Heading } from "@radix-ui/themes";
import IssueForm from "../_components/IssueForm";

export default async function NewIssuePage() {
  return (
    <Box>
      <Heading as="h1" className="mb-4">
        Create New Issue
      </Heading>
      <IssueForm />
    </Box>
  );
}
