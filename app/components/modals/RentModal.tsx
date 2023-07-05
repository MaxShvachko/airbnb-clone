'use client';

import { useCallback, useState } from 'react';

import useRentModalStore from '@/app/hooks/useRentModalStore';
import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '@/app/constants/ui/categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import { CountrySelectValue } from '@/app/hooks/useCountries';
import FormMap from '../FormMap';
import Counter from '../inputs/Counter';
import { RENT_MODAL_COUNTERS } from '@/app/constants/ui/counters';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { API_ROUTES } from '@/app/constants/routes';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum RentSteps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  DESCRIPTION = 3,
  IMAGES = 4,
  PRICE = 5
}

export default function RentModal() {
  const { refresh } = useRouter();
  const isOpen = useRentModalStore((store) => store.isOpen);
  const close = useRentModalStore((store) => store.close);
  const [step, setStep] = useState<RentSteps>(RentSteps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const isCategoryStep = step === RentSteps.CATEGORY;

  const handleNextStep = () => {
    setStep((value) => value === RentSteps.PRICE ? value : value + 1);
  };

  const handlePreviousStep = () => {
    setStep((value) => isCategoryStep ? value : value - 1);
  };

  const handleSetFormValue = useCallback((
    name: string,
    value: string | CountrySelectValue | number
  ) => setValue(
    name,
    value,
    { shouldDirty: true, shouldTouch: true, shouldValidate: true }
  ), [setValue]) ;

  const handleCreateRent = async(data: FieldValues) => {
    if (step !== RentSteps.PRICE) {
      return handleNextStep();
    }

    try {
      setIsLoading(true);
      await axios.post(API_ROUTES.LISTINGS(), data);
      toast.success('Listing Created!');
      refresh();
      reset();
      close();
      setStep(RentSteps.CATEGORY);
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = step === RentSteps.PRICE ? 'Create' : 'Next';

  const secondaryActionLabel = isCategoryStep ? undefined : 'Back';

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              watch={watch}
              name="category"
              onClick={handleSetFormValue}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === RentSteps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          name="location"
          onChange={handleSetFormValue}
          watch={watch}
        />
        <FormMap name="location" watch={watch} />
      </div>
    );
  }

  if (step === RentSteps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        {RENT_MODAL_COUNTERS.map((item) => (
          <Counter
            key={item.name}
            {...item}
            watch={watch}
            onChange={handleSetFormValue}
          />
        ))}
      </div>
    );
  }

  if (step === RentSteps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <ImageUpload onChange={handleSetFormValue} name="imageSrc" watch={watch} />
      </div>
    );
  }

  if (step === RentSteps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === RentSteps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          type="number"
          isFormatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      onSubmit={handleSubmit(handleCreateRent)}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSecondaryAction={isCategoryStep ? undefined : handlePreviousStep}
    />
  );
}
