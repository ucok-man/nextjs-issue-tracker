"use client";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  show: boolean;
  commentId: string | number;
};

export default function CommentAction({ show, commentId }: Props) {
  const router = useRouter();

  if (!show) return <div></div>;

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => toast.error("Sorry, not implemented yet!")}
        className="cursor-pointer text-sm"
      >
        <Pencil2Icon />
        Edit
      </Button>

      <Button
        onClick={async () => {
          try {
            await axios.delete(`/api/comments/${commentId}`);
            router.refresh();
          } catch (error) {
            toast.error(
              "Sorry we have problem in our server, please try again."
            );
          }
        }}
        className="cursor-pointer text-sm"
        color="red"
      >
        <TrashIcon />
        Delete
      </Button>
    </div>
  );
}
