import prisma from "@db/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./issue-chart";
import IssueSummary from "./issue-summary";
import LatestIssue from "./latest-issue";

export const metadata: Metadata = {
  title: "Issue Tracker | Dashboard",
  description: "View a summary of project issues",
};

export default async function Home() {
  const openIssue = await prisma.issue.count({ where: { status: "OPEN" } });
  const progresIssue = await prisma.issue.count({
    where: { status: "IN_PROGGRES" },
  });
  const closedIssue = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"} className="">
        <Flex direction={"column"} gap={"5"}>
          <IssueSummary
            open={openIssue}
            inProgress={progresIssue}
            closed={closedIssue}
          />
          <IssueChart
            open={openIssue}
            inProgress={progresIssue}
            closed={closedIssue}
          />
        </Flex>
        <LatestIssue />
      </Grid>
    </div>
  );
}
