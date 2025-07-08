import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

import { Issue, Status } from '@prisma/client';
import { IssueStatusBadge, Link, Pagination } from '@/app/components';
import IssueActions from './IssueActions';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
    sort?: 'asc' | 'desc';
  }>;
}) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hideColumnOnMd' },
    { label: 'Created', value: 'createdAt', className: 'hideColumnOnMd' },
  ];

  const searchParamsObject = await searchParams;
  const { status, sort } = searchParamsObject;
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const where = {
    status: validStatus,
  };

  const validSort = sort === 'asc' || sort === 'desc' ? sort : 'desc';

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParamsObject.orderBy)
    ? { [searchParamsObject.orderBy]: validSort }
    : undefined;

  const page = parseInt(searchParamsObject.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <>
      <IssueActions />
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
                      ...searchParamsObject,
                      orderBy: column.value,
                      sort: sort === 'asc' ? 'desc' : 'asc',
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParamsObject.orderBy &&
                  sort === 'asc' && <ArrowUpIcon className="inline" />}
                {column.value === searchParamsObject.orderBy &&
                  sort === 'desc' && <ArrowDownIcon className="inline" />}
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
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
}

export const dynamic = 'force-dynamic';
export default IssuesPage;
