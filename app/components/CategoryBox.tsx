'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import qs from 'query-string';

export interface Props {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

export default function CategoryBox({ icon: Icon, label }: Props) {
  const { push } = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();

  const isSelected = params?.get('category') === label;

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: Record<string, string> = {
      ...currentQuery,
      category: label
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: pathName as string,
      query: updatedQuery
    }, { skipNull: true });

    push(url);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
      `,
      isSelected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'
      )}
    >
      <Icon size={26} />
      <span className="font-medium text-sm">
        {label}
      </span>
    </button>
  );
}
