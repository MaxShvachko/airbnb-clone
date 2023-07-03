'use client ';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import useFavorite from '../hooks/useFavorite';

interface Props {
  listingId: string;
  currentUser?: User | null
}

export default function HeartButton({ listingId, currentUser }: Props) {
  const { toggleFavorite, isFavorite } = useFavorite({ listingId, currentUser });

  return (
    <button
      onClick={toggleFavorite}
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
