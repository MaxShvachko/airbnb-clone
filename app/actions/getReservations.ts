import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  listing?: { userId: string }
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: IParams = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reservations;
  } catch (error) {
    throw new Error(error as string);
  }
}
