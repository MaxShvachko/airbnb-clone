'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Listing, User } from '@prisma/client';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import { API_ROUTES } from '../constants/routes';

interface Props {
  listings: Listing[],
  currentUser?: User | null,
}

export default function Properties({
  listings,
  currentUser
}: Props) {
  const { refresh } = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleDelete = useCallback(async(id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(API_ROUTES.LISTINGS(id));
      toast.success('Listing deleted');
      refresh();
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    } finally {
      setDeletingId('');
    }
  }, [refresh]);

  return (
    <Container>
      <Heading
        title="Properties"
        subTitle="List of your properties"
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
            actionId={listing.id}
            onAction={handleDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

