'use client';

import qs, { StringifiableRecord } from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModalStore from '@/app/hooks/useSearchModalStore';

import Modal from './Modal';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';
import Heading from '../Heading';
import { useForm, FieldValues } from 'react-hook-form';
import { CountrySelectValue } from '@/app/hooks/useCountries';
import FormMap from '../FormMap';
import FormCalendar from '../FormCalendar';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const isOpen = useSearchModalStore((state) => state.isOpen);
  const close = useSearchModalStore((state) => state.close);
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const {
    handleSubmit,
    setValue,
    watch
  } = useForm<FieldValues>({
    defaultValues: {
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
      bathroomCount: 1,
      roomCount: 1,
      guestCount: 1,
      location: undefined
    }
  });

  const handleBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async(data: FieldValues) => {
    if (step !== STEPS.INFO) {
      return handleNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: StringifiableRecord = {
      ...currentQuery,
      locationValue: data.location?.value,
      guestCount: data.guestCount,
      roomCount: data.roomCount,
      bathroomCount: data.bathroomCount
    };

    if (data.dateRange.startDate) {
      updatedQuery.startDate = formatISO(data.dateRange.startDate);
    }

    if (data.dateRange.endDate) {
      updatedQuery.endDate = formatISO(data.dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    close();
    router.push(url);
  },
  [close, handleNext, params, router, step]);

  const handleSetFormValue = useCallback((
    name: string,
    value: string | CountrySelectValue | number | Range
  ) => setValue(
    name,
    value,
    { shouldDirty: true, shouldTouch: true }
  ), [setValue]) ;

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subTitle="Find the perfect location!"
      />
      <CountrySelect
        watch={watch}
        name="location"
        onChange={handleSetFormValue}
      />
      <hr />
      <FormMap name="location" watch={watch} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <FormCalendar
          title="When do you plan to go?"
          subTitle="Make sure everyone is free!"
          name="dateRange"
          watch={watch}
          onChange={handleSetFormValue}

        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subTitle="Find your perfect place!"
        />
        <Counter
          name="guestCount"
          watch={watch}
          onChange={handleSetFormValue}
          title="Guests"
          subTitle="How many guests are coming?"
        />
        <hr />
        <Counter
          watch={watch}
          name="roomCount"
          onChange={handleSetFormValue}
          title="Rooms"
          subTitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          watch={watch}
          name="bathroomCount"
          onChange={handleSetFormValue}
          title="Bathrooms"
          subTitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      onSecondaryAction={step === STEPS.LOCATION ? undefined : handleBack}
      onClose={close}
      body={bodyContent}
    />
  );
};

export default SearchModal;
