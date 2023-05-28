'use client';

import { ROUTES } from '@/app/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={ROUTES.HOME}>
      <Image
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width="100"
        height="100"
        src="/images/logo.png"
      />
    </Link>
  );
}
