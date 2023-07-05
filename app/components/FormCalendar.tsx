import { Range, RangeKeyDict } from 'react-date-range';

import { UseFormWatch, FieldValues } from 'react-hook-form';
import Heading from './Heading';
import Calendar from './inputs/Calendar';

export interface Props {
  name: string;
  watch: UseFormWatch<FieldValues>;
  title: string;
  subTitle: string;
  onChange: (name: string, value: Range) => void;
}

export default function FormCalendar({
  name,
  onChange,
  subTitle,
  title,
  watch
}: Props) {
  const value = watch(name);

  const handleChange = (value: RangeKeyDict) => {
    onChange(name, value.selection);
  };

  return (
    <>
      <Heading
        title={title}
        subTitle={subTitle}
      />
      <Calendar
        value={value}
        onChange={handleChange}
      />
    </>
  );
}
