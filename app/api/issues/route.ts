import { NextResponse } from 'next/server';
import { NextAuthRequest } from 'next-auth';

import prisma from '@/prisma/client';
import { auth } from '@/auth';
import { issueSchema } from '@/app/validationSchemas';

export const POST = auth(async function POST(request: NextAuthRequest) {
  if (!request.auth)
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
});
