"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type StatusFilter = Status | "ALL";

const statuses: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progres", value: "IN_PROGGRES" },
];

type Props = {};

export default function IssueStatusFilter({}: Props) {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "ALL" ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter Status..." />
      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
