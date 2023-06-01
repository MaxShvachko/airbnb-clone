'use client';

import Select from 'react-select';
import { UseFormWatch, FieldValues } from 'react-hook-form';

import useCountries, { CountrySelectValue } from '@/app/hooks/useCountries';
import { useMemo } from 'react';

export interface Props {
  name: string;
  watch: UseFormWatch<FieldValues>;
  onChange: (name: string, value: CountrySelectValue) => void;
}

export default function CountrySelect({
  name,
  watch,
  onChange
}: Props) {
  const { getAll } = useCountries();

  const options = useMemo(() => getAll(), [getAll]);

  const value = watch(name);

  return (
    <div>
      <Select
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
        placeholder="Anywhere"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(name, value as CountrySelectValue)}
        formatOptionLabel={({ flag, label, region }) => (
          <div className="flex flex-row gap-3 items-center">
            <div>{flag}</div>
            <div>
              {label},
              <span className="text-neutral-500 ml-1">
                {region}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
}
