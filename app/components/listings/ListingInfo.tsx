'use client ';
import { Listing, User } from '@prisma/client';
import { useMemo } from 'react';

import { Category } from '@/app/constants/ui/categories';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

type PickedListingProps = Pick<
  Listing,
 'description' | 'roomCount' | 'guestCount' | 'bathroomCount'| 'locationValue'
>;

export interface Props extends PickedListingProps {
  user: User;
  category?: Category;
}

export default function ListingInfo({
  locationValue,
  bathroomCount,
  category,
  description,
  guestCount,
  roomCount,
  user
}: Props) {
  const { getByValue } = useCountries();

  const coordinates = useMemo(() => {
    return getByValue(locationValue)?.latlng;
  }, [getByValue, locationValue]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <span>Hosted by - {user?.name}</span>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guest{guestCount > 1 && 's'}</span>
          <span>{roomCount} room{roomCount > 1 && 's'}</span>
          <span>{bathroomCount} bathroom{bathroomCount > 1 && 's'}</span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <span className="text-lg font-light text-neutral-500">
        {description}
      </span>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
