'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import ListingHead from '@/app/components/listings/ListingHead';
import { categories } from '@/app/constants/ui/categories';
import { Listing, Reservation, User } from '@prisma/client';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModalStore from '@/app/hooks/useLoginModalStore';
import { useRouter } from 'next/navigation';
import { API_ROUTES, ROUTES } from '@/app/constants/routes';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

export interface Props {
  currentUser?: User | null;
  listing: Listing & {
     user: User;
  };
  reservations?: Reservation[];
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

export default function Listing({
  listing,
  currentUser,
  reservations = []
}: Props) {
  const openLoginModal = useLoginModalStore((state) => state.open);
  const { push } = useRouter();
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((item) => {
      const range = eachDayOfInterval({
        start: item.startDate,
        end: item.endDate
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const handleCreateReservation = useCallback(async() => {
    if (!currentUser) {
      return openLoginModal();
    }

    try {
      setIsLoading(true);
      await axios.post(API_ROUTES.RESERVATIONS(), {
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      });
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      push(ROUTES.TRIPS);
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    openLoginModal,
    listing.id,
    totalPrice,
    dateRange.startDate,
    dateRange.endDate,
    push
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <div
      className="
        max-w-screen-lg
        mx-auto
        px-3
      "
    >
      <div className="flex flex-col gap-6">
        <ListingHead
          id={listing.id}
          title={listing.title}
          imageSrc={listing.imageSrc}
          currentUser={currentUser}
          locationValue={listing.locationValue}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            roomCount={listing.roomCount}
            category={category}
            guestCount={listing.guestCount}
            description={listing.description}
            locationValue={listing.locationValue}
            bathroomCount={listing.bathroomCount}
          />
          <div
            className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={handleCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
