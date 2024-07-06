import { Status } from "@prisma/client";
import { Badge, BadgeProps } from "@radix-ui/themes";

type Props = {
  status: Status;
};

const statusColorMap: Record<
  Status,
  { label: string; color: BadgeProps["color"] }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGGRES: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export default function IssueStatusBadge({ status }: Props) {
  const { label, color } = statusColorMap[status];
  return <Badge color={color}>{label}</Badge>;
}
