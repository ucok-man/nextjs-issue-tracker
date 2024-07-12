import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnID, OrderBy } from "./util";

type Props = {
  itemid: ColumnID;
  orderby: OrderBy;
  sortDirection: "asc" | "desc";
};

export default function SortArrow({ itemid, orderby, sortDirection }: Props) {
  const sanitizeOrderby = orderby.startsWith("-")
    ? orderby.substring(1)
    : orderby;

  if (sanitizeOrderby !== itemid) {
    return null;
  }

  if (sortDirection === "asc") {
    return <ArrowUpIcon className="inline" />;
  }
  return <ArrowDownIcon className="inline" />;
}
