import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
// import NextLink from "next/link";
import IssueStatusBadge from "@/components/issue-status-badge";
import Link from "@/components/link";
import ItemLabel from "./item-label";
import SortArrow from "./sort-arrow";
import { ColumnID, OrderBy } from "./util";

type Props = {
  searchParams: {
    status: Status | "ALL";
    orderBy: OrderBy;
    orderSort: "asc" | "desc";
  };
  issues: Issue[];
};

export default function IssueTabel({ searchParams, issues }: Props) {
  const columns: {
    label: string;
    id: ColumnID;
    value: OrderBy;
    classes?: string;
  }[] = [
    {
      label: "Issue",
      id: "title",
      value: getOrderByValue(searchParams.orderBy)["title"],
      classes: "",
    },
    {
      label: "Status",
      id: "status",
      value: getOrderByValue(searchParams.orderBy)["status"],
      classes: "hidden md:table-cell",
    },
    {
      label: "Created",
      id: "createdAt",
      value: getOrderByValue(searchParams.orderBy)["createdAt"],
      classes: "hidden md:table-cell",
    },
  ];

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((item) => (
            <Table.ColumnHeaderCell key={item.label} className={item.classes}>
              <ItemLabel label={item.label} value={item.value} />
              <SortArrow
                itemid={item.id}
                orderby={searchParams.orderBy}
                sortDirection={searchParams.orderSort}
              />
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function getOrderByValue(
  param: Props["searchParams"]["orderBy"]
): Record<Exclude<OrderBy, "-title" | "-createdAt" | "-status">, OrderBy> {
  return {
    title: param === "-title" ? "title" : `-title`,
    createdAt: param === "-createdAt" ? "createdAt" : `-createdAt`,
    status: param === "-status" ? "status" : `-status`,
  };
}
