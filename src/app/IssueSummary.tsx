import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

type IssueSummaryStatus = {
  label: string;
  value: number;
  status: Status;
};

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const items: IssueSummaryStatus[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGGRES" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap={"4"}>
      {items.map((item) => (
        <Card key={item.label}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${item.status}`}
            >
              {item.label}
            </Link>
            <Text size={"5"} weight={"bold"}>
              {item.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
