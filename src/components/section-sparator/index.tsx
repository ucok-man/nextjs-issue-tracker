import { Flex, Separator } from "@radix-ui/themes";

type Props = {
  children: React.ReactNode;
};

export default function SectionSparator({ children }: Props) {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={"2"}
      my={"5"}
      className="w-full"
    >
      <Separator className="w-full" />
      <div className="text-nowrap italic text-gray-400 text-base">
        {children}
      </div>
      <Separator className="w-full" />
    </Flex>
  );
}
