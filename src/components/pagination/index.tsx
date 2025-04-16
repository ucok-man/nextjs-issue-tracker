"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const query = new URLSearchParams(searchParams);
    query.set("page", page.toString());
    router.push("?" + query.toString());
  };

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
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage <= 1}
        className="cursor-pointer"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage >= pageCount}
        className="cursor-pointer"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="violet"
        variant="soft"
        disabled={currentPage >= pageCount}
        className="cursor-pointer"
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
