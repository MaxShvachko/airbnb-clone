import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { UseFormWatch, FieldValues } from 'react-hook-form';
import { CountrySelectValue } from '../hooks/useCountries';

export interface Props {
  watch: UseFormWatch<FieldValues>;
  name: string;
}

export default function FormMap({
  watch,
  name
}: Props) {
  const value = watch(name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import('./Map'), {
    ssr: false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [value]);

  return (
    <Map center={(value as CountrySelectValue)?.latlng} />
  );
}
