import { Link } from "@/components";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@db/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssuesHeader from "./IssuesHeader";

type OrderBy =
  | Extract<keyof Issue, "createdAt" | "title" | "status">
  | `-${Extract<keyof Issue, "createdAt" | "title" | "status">}`;

type Props = {
  searchParams: {
    status: Status | undefined;
    orderBy: OrderBy | undefined;
  };
};

export default async function IssuesPage({ searchParams }: Props) {
  const { validstatus, validOrderBy } = validateSearchParams(searchParams);

  const issues = await prisma.issue.findMany({
    where: {
      status: validstatus,
    },
    orderBy: {
      [validOrderBy || "createdAt"]: getSortDirection(searchParams.orderBy),
    },
  });

  const columns: {
    label: string;
    value: OrderBy;
    classes?: string;
  }[] = [
    { label: "Issue", value: getOrderByValue(searchParams.orderBy)["title"] },
    {
      label: "Status",
      value: getOrderByValue(searchParams.orderBy)["status"],
      classes: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: getOrderByValue(searchParams.orderBy)["createdAt"],
      classes: "hidden md:table-cell",
    },
  ];

  return (
    <div>
      <IssuesHeader />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, classes, value }) => (
              <Table.ColumnHeaderCell key={label} className={classes}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                    },
                  }}
                >
                  {label}
                </NextLink>
                {value.includes(validOrderBy!) &&
                  (getSortDirection(searchParams.orderBy) === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
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
    </div>
  );
}

function validateSearchParams(params: Props["searchParams"]) {
  let result: {
    validstatus: Status | undefined;
    validOrderBy: string | undefined;
  } = {
    validstatus: undefined,
    validOrderBy: undefined,
  };

  if (params.status !== undefined) {
    const safeStatuses = Object.values(Status);
    result.validstatus = safeStatuses.includes(params.status)
      ? params.status
      : undefined;
  }

  if (params.orderBy !== undefined) {
    const safeOrderBy: OrderBy[] = [
      "createdAt",
      "status",
      "title",
      "-title",
      "-createdAt",
      "-status",
    ];
    const validOrderBy = safeOrderBy.includes(params.orderBy as OrderBy)
      ? params.orderBy
      : undefined;

    if (validOrderBy && validOrderBy.includes("-")) {
      result.validOrderBy = params.orderBy.substring(1, params.orderBy.length);
    } else {
      result.validOrderBy = validOrderBy;
    }
  }
  return result;
}

function getSortDirection(orderby: OrderBy | undefined) {
  if (orderby !== undefined && !orderby.includes("-")) {
    return "asc";
  }
  return "desc";
}

function getOrderByValue(
  param: Props["searchParams"]["orderBy"]
): Record<Exclude<OrderBy, "-title" | "-createdAt" | "-status">, OrderBy> {
  return {
    title: param === "-title" || param === undefined ? "title" : `-title`,
    createdAt:
      param === "-createdAt" || param === undefined
        ? "createdAt"
        : `-createdAt`,
    status: param === "-status" || param === undefined ? "status" : `-status`,
  };
}
