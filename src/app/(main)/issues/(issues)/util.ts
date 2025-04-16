import { Issue, Status } from "@prisma/client";

export type OrderBy =
  | Extract<keyof Issue, "createdAt" | "title" | "status">
  | `-${Extract<keyof Issue, "createdAt" | "title" | "status">}`;

export type SearchParams = {
  status: Status | undefined;
  orderBy: OrderBy | undefined;
  page: string | undefined;
};

export type ValidatedSearchParamsResult = {
  status: Status | "ALL";
  orderBy: OrderBy;
  orderSort: "asc" | "desc";
  page: number;
};

export type ColumnID = "title" | "status" | "createdAt";

export function validateSearchParams(
  params: SearchParams
): ValidatedSearchParamsResult {
  // this is the initial value
  let result: ValidatedSearchParamsResult = {
    status: "ALL",
    orderBy: "createdAt",
    orderSort: "asc",
    page: 1,
  };

  if (params.status !== undefined) {
    const safeStatuses = Object.values(Status);
    result.status = safeStatuses.includes(params.status)
      ? params.status
      : "ALL";
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
      : "createdAt";

    result.orderBy = validOrderBy;

    if (validOrderBy.includes("-")) {
      result.orderSort = "desc";
    } else {
      result.orderSort = "asc";
    }
  }

  const page = params.page !== undefined ? parseInt(params.page) : 1;
  result.page = page;

  return result;
}
