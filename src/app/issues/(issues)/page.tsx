import Pagination from "@/components/Pagination";
import prisma from "@db/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueTabel from "./IssueTabel";
import IssuesHeader from "./IssuesHeader";
import { SearchParams, validateSearchParams } from "./util";

export const metadata: Metadata = {
  title: "Issue Tracker | Issue List",
  description: "View all of project issues",
};

type Props = {
  searchParams: SearchParams;
};

export default async function IssuesPage({ searchParams }: Props) {
  const {
    status,
    orderBy,
    orderSort,
    page: currentPage,
  } = validateSearchParams(searchParams);
  const pageSize = 10;

  const sanitizeOrderBy = orderBy.startsWith("-") ? orderBy.slice(1) : orderBy;
  const issues = await prisma.issue.findMany({
    where: {
      status: status !== "ALL" ? status : undefined,
    },
    orderBy: {
      [sanitizeOrderBy]: orderSort,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const totalRecords = await prisma.issue.count({
    where: {
      status: status !== "ALL" ? status : undefined,
    },
  });

  return (
    <Flex direction={"column"} gap={"4"}>
      <IssuesHeader />
      <IssueTabel
        issues={issues}
        searchParams={{
          orderBy: orderBy,
          status: status,
          orderSort: orderSort,
        }}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={totalRecords}
      />
    </Flex>
  );
}
