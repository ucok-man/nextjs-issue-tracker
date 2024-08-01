import prisma from "@db/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openIssue = await prisma.issue.count({ where: { status: "OPEN" } });
  const progresIssue = await prisma.issue.count({
    where: { status: "IN_PROGGRES" },
  });
  const closedIssue = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div>
      {/* <LatestIssue /> */}
      {/* <IssueSummary
        closed={openIssue}
        inProgress={progresIssue}
        open={closedIssue}
      /> */}
      <IssueChart
        closed={openIssue}
        inProgress={progresIssue}
        open={closedIssue}
      />
    </div>
  );
}
