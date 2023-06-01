import { useMemo } from 'react';
import countries from 'world-countries';

const FORMATTED_COUNTRIES = countries.map(({ cca2, name, flag, latlng, region }) => ({
  value: cca2,
  label: name.common,
  flag,
  latlng,
  region
}));

export type CountrySelectValue = typeof FORMATTED_COUNTRIES[0]

export default function useCountries() {
  return useMemo(() => {
    const getAll = () => FORMATTED_COUNTRIES;

    const getByValue = (value: string) => FORMATTED_COUNTRIES.find((item) => item.value === value);

    return { getByValue, getAll };
  }, []);
}
