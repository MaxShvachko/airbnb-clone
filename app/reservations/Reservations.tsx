'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Listing, Reservation, User } from '@prisma/client';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import { API_ROUTES } from '../constants/routes';

interface ReservationsClientProps {
  reservations: (Reservation & { listing: Listing })[],
  currentUser?: User | null,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const { refresh } = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(async(id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(API_ROUTES.RESERVATIONS(id));
      toast.success('Reservation cancelled');
      refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setDeletingId('');
    }
  }, [refresh]);

  return (
    <Container>
      <Heading
        title="Reservations"
        subTitle="Bookings on your properties"
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
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
