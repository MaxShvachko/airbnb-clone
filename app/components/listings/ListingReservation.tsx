'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';

interface Props {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export default function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}: Props) {
  return (
    <div
      className="
      bg-white
        rounded-xl
        border-[1px]
      border-neutral-200
        overflow-hidden
      "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-2xl font-semibold">
          $ {price}
        </span>
        <span className="font-light text-neutral-600">
          night
        </span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button
          label="Reserve"
          onClick={onSubmit}
          disabled={disabled}
        />
      </div>
      <hr />
      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <span>
          Total
        </span>
        <span>
          $ {totalPrice}
        </span>
      </div>
    </div>
  );
}
