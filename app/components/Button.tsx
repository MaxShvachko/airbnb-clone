'use client';

import clsx from 'clsx';
import { IconType } from 'react-icons';

export interface Props {
  icon?: IconType;
  label?: string;
  small?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>
  outline?: boolean;
  disabled?: boolean;
}

export default function Button({
  icon: Icon,
  label,
  small,
  onClick,
  outline,
  disabled
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
          relative 
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg 
          hover:opacity-80 
          transition
          w-full
        `,
        outline && 'bg-white border-black text-black hover:bg-slate-100',
        !outline && 'bg-rose-500 border-rose-500 text-white',
        small && 'py-1 text-sm font-light border-[1px]',
        !small && 'py-3 text-md font-semibold border-2'
      )}
    >
      {Icon && (
        <Icon
          className="absolute left-4 top-3"
          size={24}
        />
      )}
      {label}
    </button>
  );
}
