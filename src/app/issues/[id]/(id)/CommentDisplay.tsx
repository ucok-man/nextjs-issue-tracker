import { Avatar, Box, Card, Flex, Separator, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Props = {};

export default function CommentDisplay({}: Props) {
  return (
    <Box>
      <CommentDisplayCard />
    </Box>
  );
}

type CommentDisplayCardProps = {};

function CommentDisplayCard({}: CommentDisplayCardProps) {
  return (
    <>
      <Card>
        <Flex gap="3" align="center" mb={"2"}>
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="?"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              Teodros Girmay
            </Text>
            <Text as="div" size="1" color="gray">
              commented on May 4, 2023
            </Text>
          </Box>
        </Flex>
        <Card className="prose prose-headings:text-2xl max-w-full" mt="1">
          <ReactMarkdown>
            It seems like it's because of the corrupted font file. I didn't see
            this output in the terminal [cause]: Error: Unsupported OpenType
            signature wOF2
          </ReactMarkdown>
        </Card>
      </Card>
      <Box px={"6"}>
        <Separator orientation={"vertical"} size={"2"} />
      </Box>
    </>
  );
}
