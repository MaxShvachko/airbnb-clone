import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import Listing from './Listing';
import getReservations from '@/app/actions/getReservations';

interface Props {
  listingId: string;
}

export default async function ListingPage({ params }: { params: Props }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <Listing
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
