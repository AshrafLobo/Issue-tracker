import prisma from '@/prisma/client';

import { Status } from '@prisma/client';
import { Pagination } from '@/app/components';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) {
  const searchParamsObject = await searchParams;
  const { status, sort } = searchParamsObject;
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const where = {
    status: validStatus,
  };

  const validSort = sort === 'asc' || sort === 'desc' ? sort : 'desc';

  const orderBy = columnNames.includes(searchParamsObject.orderBy)
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
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParamsObject} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const dynamic = 'force-dynamic';
export default IssuesPage;
