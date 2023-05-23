'use client';

import clsx from 'clsx';

export interface Props {
  title: string;
  subTitle?: string;
  center?: boolean;
}

export default function Heading({
  title,
  center,
  subTitle
}: Props) {
  return (
    <div className={clsx(center ? 'text-center' : 'text-start')}>
      <h3 className="text-2xl font-bold">
        {title}
      </h3>
      <h4 className="font-light text-neutral-500 mt-2">
        {subTitle}
      </h4>
    </div>
  );
}
