"use client";

import { Skeleton } from "@/components";
import { updateIssueDTO } from "@/types/issueDTO";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import { z } from "zod";

type Props = {
  issue: Issue;
};

type UpdateIssueDTO = z.infer<typeof updateIssueDTO>;

export default function AssigneeSelect({ issue }: Props) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: body } = await axios.get<{ data: User[] }>("/api/users");
      return body.data;
    },
    staleTime: 60 * 1000, // 60 seconds
    retry: 3,
  });

  const onChange = async (userid: string) => {
    await axios.patch("/api/issues/" + issue.id, {
      assignedToUserId: userid === "none" ? null : userid,
    } as UpdateIssueDTO);
  };

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "none"} // !UNSAVE "none"
      onValueChange={(userid) => onChange(userid)}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Separator />
          <Select.Item value="none">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id!}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
