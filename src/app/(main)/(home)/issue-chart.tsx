"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function IssueChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: "var(--accent-9)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
