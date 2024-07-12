import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage <= 1}
        className="cursor-pointer"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage <= 1}
        className="cursor-pointer"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage >= pageCount}
        className="cursor-pointer"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage >= pageCount}
        className="cursor-pointer"
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
