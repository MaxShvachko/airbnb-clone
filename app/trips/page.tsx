
import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import Trips from './Trips';

const TripsPage = async() => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="Please login"
      />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return (
    <Trips
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default TripsPage;
