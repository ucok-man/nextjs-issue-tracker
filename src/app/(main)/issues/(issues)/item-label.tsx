"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OrderBy } from "./util";

type Props = {
  label: string;
  value: OrderBy;
};

export default function ItemLabel({ label, value }: Props) {
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams);
  query.set("orderBy", value);

  return <Link href={"/issues?" + query.toString()}>{label}</Link>;
}
