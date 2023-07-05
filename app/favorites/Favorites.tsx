import { Listing, User } from '@prisma/client';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';

interface Props {
  listings: Listing[],
  currentUser?: User | null,
}

export default function FavoritesClient({
  listings,
  currentUser
}: Props) {
  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="List of places you favorited!"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
