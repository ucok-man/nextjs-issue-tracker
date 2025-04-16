"use client";

import Skeleton from "@/components/skeleton";
import { toast, Toaster } from "@/components/toast";
import { updateIssueDTO } from "@/types/issueDTO";
import { Issue } from "@prisma/client";
import { Avatar, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import { z } from "zod";

type Props = {
  issue: Issue;
};

type UpdateIssueDTO = z.infer<typeof updateIssueDTO>;

export default function AssigneeSelect({ issue }: Props) {
  const { users, error, isLoading } = useUser();

  const onChange = async (userid: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToId: userid === "none" ? null : userid,
      } as UpdateIssueDTO);
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    }
  };

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToId || "none"} // !UNSAVE "none"
        onValueChange={(userid) => onChange(userid)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Separator />
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item className="flex" key={user.id} value={user.id!}>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user?.image!}
                    fallback="?"
                    radius="full"
                    size={"1"}
                  />
                  <div>{user.name}</div>
                </div>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
}

function useUser() {
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
  return { users, error, isLoading };
}
