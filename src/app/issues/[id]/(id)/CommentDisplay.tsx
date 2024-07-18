import prisma from "@db/client";
import { Comment, User } from "@prisma/client";
import { Avatar, Box, Card, Flex, Separator, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Props = {
  issueId: number;
};

export default async function CommentDisplay({ issueId }: Props) {
  const comments = await prisma.comment.findMany({
    where: {
      issueId: issueId,
    },
    include: {
      author: true,
    },
  });

  return (
    <Box>
      {comments.map((comment) => (
        <CommentDisplayCard
          key={comment.id}
          comment={comment}
          author={comment.author}
        />
      ))}
    </Box>
  );
}

type CommentDisplayCardProps = {
  comment: Comment;
  author: User;
};

function CommentDisplayCard({ comment, author }: CommentDisplayCardProps) {
  return (
    <>
      <Card>
        <Flex gap="3" align="center" mb={"2"}>
          <Avatar size="3" src={author.image!} radius="full" fallback="?" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {author.name}
            </Text>
            <Text as="div" size="1" color="gray">
              commented on {comment.createdAt.toDateString()}
            </Text>
          </Box>
        </Flex>
        <Card className="prose prose-headings:text-2xl max-w-full" mt="1">
          <ReactMarkdown>{comment.description}</ReactMarkdown>
        </Card>
      </Card>
      <Box px={"6"}>
        <Separator orientation={"vertical"} size={"2"} />
      </Box>
    </>
  );
}
