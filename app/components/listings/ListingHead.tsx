'use client';
import { useMemo } from 'react';

import useCountries from '@/app/hooks/useCountries';
import { Listing, User } from '@prisma/client';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

type PickedListingProps = Pick<Listing, 'id' | 'title' | 'imageSrc' | 'locationValue'>;

export interface Props extends PickedListingProps {
  currentUser?: User | null;
}

export default function ListingHead({
  id,
  title,
  imageSrc,
  currentUser,
  locationValue
}: Props) {
  const { getByValue } = useCountries();
  const location = useMemo(() => {
    return getByValue(locationValue);
  }, [locationValue, getByValue]);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] rounded-xl relative">
        <Image
          alt={title}
          src={imageSrc}
          fill
          className="object-cover w-full rounded-xl"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
