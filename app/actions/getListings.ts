import prisma from '../libs/prismadb';

export default async function getListings() {
  try {
    return await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    throw new Error(error as string);
  }
}
