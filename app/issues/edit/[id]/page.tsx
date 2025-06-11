import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import IssueForm from '../../_components/IssueFormWrapper';

async function EditIssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
