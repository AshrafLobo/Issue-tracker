import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

import { Issue, Status } from '@prisma/client';
import { IssueStatusBadge, Link } from '@/app/components';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sort?: 'asc' | 'desc';
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

function IssueTable({ searchParams, issues }: Props) {
  const { sort, orderBy } = searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sort: sort === 'asc' ? 'desc' : 'asc',
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === orderBy && sort === 'asc' && (
                <ArrowUpIcon className="inline" />
              )}
              {column.value === orderBy && sort === 'desc' && (
                <ArrowDownIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hideColumnOnMd">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hideColumnOnMd">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hideColumnOnMd' },
  { label: 'Created', value: 'createdAt', className: 'hideColumnOnMd' },
];

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
