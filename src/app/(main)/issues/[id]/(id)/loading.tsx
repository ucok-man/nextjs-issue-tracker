import Skeleton from "@/components/skeleton";
import { Box, Card, Flex } from "@radix-ui/themes";

export default function LoadingIssueDetailPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex align="center" gap="3" my="2">
        <Skeleton width={"5rem"} />
        <Skeleton width={"7rem"} />
      </Flex>
      <Card className="prose prose-sm" mt="5">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
}
