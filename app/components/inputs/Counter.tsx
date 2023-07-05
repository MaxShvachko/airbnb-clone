'use client';

import { UseFormWatch, FieldValues } from 'react-hook-form';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export interface Props {
  name: string;
  watch: UseFormWatch<FieldValues>;
  title: string;
  subTitle: string;
  onChange: (name: string, value: number) => void;
}

export default function Counter({
  name,
  watch,
  title,
  onChange,
  subTitle
}: Props) {
  const value = watch(name);

  const handleIncrease = () => onChange(name, value + 1);
  const handleDecrease = () => {
    if (value === 1) return;
    onChange(name, value - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <span className="font-medium">
          {title}
        </span>
        <span className="font-light text-gray-600">
          {subTitle}
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={handleDecrease}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </button>
        <span className="font-light text-xl text-neutral-600">
          {value}
        </span>
        <button
          onClick={handleIncrease}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
