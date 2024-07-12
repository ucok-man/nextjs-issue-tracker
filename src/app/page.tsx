import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    page: string;
  };
};

export default function Home({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.page);
  if (!currentPage) return notFound();

  return (
    <Pagination
      currentPage={parseInt(searchParams.page)}
      itemCount={100}
      pageSize={10}
    />
  );
}
