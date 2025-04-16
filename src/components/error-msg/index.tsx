import { Text } from "@radix-ui/themes";

type Props = {
  children: React.ReactNode;
};

export default function ErrorMsg({ children }: Props) {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
}
