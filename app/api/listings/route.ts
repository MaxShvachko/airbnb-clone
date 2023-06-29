import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response(JSON.stringify({ error: 'You must be authorized for creating listings' }), { status: 400 });
  }

  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description
  } = body;

  const hasRequiredData = Object.entries(body).every(([, value]) => Boolean(value));

  if (!hasRequiredData) {
    return new Response(JSON.stringify({ error: 'You must fill all required data' }), { status: 422 });
  }

  const listing = await prisma.listing.create({
    data: {
      bathroomCount,
      userId: currentUser.id,
      category,
      description,
      guestCount,
      imageSrc,
      locationValue: location?.value,
      price: parseInt(price, 10),
      roomCount,
      title
    }
  });

  return NextResponse.json(listing);
}
