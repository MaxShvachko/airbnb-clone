'use client';

import Image from 'next/image';

export interface Props {
  src?: string | null;
}

export default function Avatar({ src }: Props) {
  return (
    <Image
      className="rounded-full"
      width="30"
      height="30"
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
}
