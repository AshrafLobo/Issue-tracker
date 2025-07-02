import { NextResponse } from 'next/server';
import { NextAuthRequest } from 'next-auth';

import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { auth } from '@/auth';

export const PATCH = auth(async function PATCH(
  request: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!request.auth)
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const issueId = parseInt(id);
  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
});

export const DELETE = auth(async function DELETE(
  request: NextAuthRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!request.auth)
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const issueId = parseInt(id);

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  await prisma.issue.delete({ where: { id: issueId } });

  return NextResponse.json({});
});
