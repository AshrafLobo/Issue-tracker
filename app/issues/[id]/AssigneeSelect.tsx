'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';

function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((response) => response.json()),
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssigneeChange = async (userId: string) => {
    const assignedToUserId = userId === 'unassigned' ? null : userId;

    await fetch(`/api/issues/${issue.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ assignedToUserId: assignedToUserId }),
    });
  };

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || 'unassigned'}
      onValueChange={handleAssigneeChange}
    >
      <Select.Trigger placeholder="Asign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
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
