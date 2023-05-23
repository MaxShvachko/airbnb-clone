'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

export interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  isFormatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function Input({
  id,
  errors,
  label,
  register,
  disabled,
  isFormatPrice,
  required,
  type = 'text'
}: Props) {
  console.log(errors, 'errors');
  return (
    <div className="w-full relative">
      {isFormatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={clsx(`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        `,
        isFormatPrice ? 'pl-9' : 'pl-4',
        errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'
        )}
      />
      <label
        htmlFor={id}
        className={clsx(`
          absolute
          text-md
          duration-150
          transform
          -translate-y-5
          top-6
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-5
        `,
        isFormatPrice ? 'left-9' : 'left-4',
        errors[id] ? 'text-rose-500' : 'text-zinc-400'
        )}
      >
        {label}
      </label>
    </div>
  );
}
