import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;

  if (!email || !name || !password) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
  }

  const existedUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existedUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user);
}
