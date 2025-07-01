'use client';
import { Select } from '@radix-ui/themes';

function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Asign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Ashraf Lobo</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
