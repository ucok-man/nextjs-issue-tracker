import { Select } from "@radix-ui/themes";

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Separator />
          <Select.Item value="1">Raul Pogba</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
