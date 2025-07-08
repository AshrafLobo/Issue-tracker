'use client';
import { Select } from '@radix-ui/themes';

import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'CLOSED', label: 'Closed' },
];

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);
    if (searchParams.get('sort'))
      params.append('sort', searchParams.get('sort')!);

    const query = params.size ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status')! || ''}
      onValueChange={handleStatusChange}
    >
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
