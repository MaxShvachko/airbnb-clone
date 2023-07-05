import prisma from '../libs/prismadb';

interface Params {
  listingId: string;
}

export default async function getListingById(params: Params) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params?.listingId
      },
      include: {
        user: true
      }
    });

    if (!listing) return null;

    return listing;
  } catch (error) {
    throw new Error(error as string);
  }
}
