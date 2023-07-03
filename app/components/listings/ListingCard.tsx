'use client';

import { Listing, Reservation, User } from '@prisma/client';
import Link from 'next/link';

import useCountries from '@/app/hooks/useCountries';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ROUTES } from '@/app/constants/routes';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface Props {
  data: Listing;
  disabled?: boolean;
  actionId?: string;
  onAction?: (id: string) => void;
  currentUser? : User | null;
  reservation?: Reservation;
  actionLabel?: string;
}

export default function ListingCard({
  data,
  onAction,
  actionId = '',
  disabled,
  currentUser,
  actionLabel,
  reservation
}: Props) {
  const { getByValue } = useCountries();

  const location = useMemo(() => (
    getByValue(data.locationValue)
  ), [data.locationValue, getByValue]);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) return;

    onAction?.(actionId);
  };

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP ')}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl
        "
        >
          <Link href={ROUTES.LISTING(data.id)}>
            <Image
              fill
              className="
            object-cover
            h-full
            w-full
            cursor-pointer
            group-hover:scale-110
            transition
          "
              src={data.imageSrc}
              alt="Listing"
            />
          </Link>
          <div className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="font-semibold text-md">
            {location?.region}, {location?.label}
            d</div>
          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold text-sm">
              $ {price}
            </div>
            {!reservation && (
              <div className="font-light">night</div>
            )}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
