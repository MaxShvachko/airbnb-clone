'use client';

import { IconType } from 'react-icons/lib';
import clsx from 'clsx';
import { FieldValues, UseFormWatch } from 'react-hook-form';

export interface Props {
  label: string;
  onClick: (name: string, value: string) => void;
  icon: IconType;
  watch: UseFormWatch<FieldValues>;
  name: string;
}

export default function CategoryInput({
  icon: Icon,
  name,
  watch,
  label,
  onClick
}: Props) {
  const category = watch(name);
  const handleClick = () => onClick(name, label);

  const isSelected = category === label;

  return (
    <button
      onClick={handleClick}
      className={clsx(`
        rounded-xl
        w-full
        border-2
        items-center
        p-4
        flex
        flex-row
        gap-3
        hover:border-black
        transition
        `,
      isSelected ? 'border-black' : 'border-neutral-200'
      )}
    >
      <Icon size={30} />
      <span className="font-semibold"> {label}</span>
    </button>
  );
}
