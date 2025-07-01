'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/users');
      const data = (await response.json()) as User[];
      setUsers(data);
    })();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Asign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
