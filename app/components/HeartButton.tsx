'use client ';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
  listingId: string;
  currentUser?: User | null
}

export default function HeartButton({}: Props) {
  const isFavorite = false;

  return (
    <button
      className="relative hover:opacity-80 transition "
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={clsx(isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70')}
      />
    </button>
  );
}
