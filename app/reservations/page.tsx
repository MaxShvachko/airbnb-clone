
import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import Reservations from './Reservations';

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="Please login"
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Reservations
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
