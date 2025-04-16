"use client";

import IssueStatusBadge from "@/components/issue-status-badge";
import { toast, Toaster } from "@/components/toast";
import { updateIssueDTO } from "@/types/issueDTO";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

type Props = {
  issue: Issue;
  currentId: string;
};

type UpdateIssueDTO = z.infer<typeof updateIssueDTO>;
const STATUS_OPTION = ["OPEN", "IN_PROGGRES", "CLOSED"] as const;

export default function StatusSelect({ issue, currentId }: Props) {
  const router = useRouter();
  const canEdit =
    currentId === issue.createdById || currentId === issue.assignedToId;

  const onChange = async (status: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        status: status,
      } as UpdateIssueDTO);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    }
  };

  if (!canEdit) return <IssueStatusBadge status={issue.status} />;

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => onChange(status)}
      >
        <Select.Trigger placeholder="Change Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Issue Status</Select.Label>
            <Select.Separator />
            {STATUS_OPTION?.map((status) => (
              <Select.Item
                className="flex hover:bg-neutral-100"
                key={status}
                value={status}
              >
                <IssueStatusBadge status={status} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
}

// function useUser() {
//   const {
//     data: users,
//     error,
//     isLoading,
//   } = useQuery<User[]>({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const { data: body } = await axios.get<{ data: User[] }>("/api/users");
//       return body.data;
//     },
//     staleTime: 60 * 1000, // 60 seconds
//     retry: 3,
//   });
//   return { users, error, isLoading };
// }
