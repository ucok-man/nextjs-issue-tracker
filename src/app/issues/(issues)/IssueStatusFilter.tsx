"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searhParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searhParams.get("status") || "ALL"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searhParams.get("orderBy"))
          params.append("orderBy", searhParams.get("orderBy") as string);

        const query = params.size > 0 ? "?" + params.toString() : "";
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
