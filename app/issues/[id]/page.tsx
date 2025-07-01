import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import IssueDetails from './IssueDetails';
import AssigneeSelect from './AssigneeSelect';
import { auth } from '@/auth';

async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="md:col-span-1">
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetailPage;
