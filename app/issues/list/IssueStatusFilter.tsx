'use client';
import { Select } from '@radix-ui/themes';

import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'CLOSED', label: 'Closed' },
];

function IssueStatusFilter() {
  const router = useRouter();

  const handleStatusChange = (status: string) => {
    const query = status !== 'ALL' ? `?status=${status}` : '';
    router.push('/issues/list' + query);
  };

  return (
    <Select.Root onValueChange={handleStatusChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
