'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModalStore from '@/app/hooks/useRegisterModalStore';
import Modal from './Modal';
import { ROUTES } from '@/app/constants/routes';
import Heading from '../Heading';
import Input from '../inputs/Input';

const DEFAULT_FORM_VALUES = {
  name: '',
  email: '',
  password: ''
};

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useRegisterModalStore((store) => store.isOpen);
  const close = useRegisterModalStore((store) => store.close);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: DEFAULT_FORM_VALUES
  });

  const handleSubmitForm: SubmitHandler<FieldValues> = async(data) => {
    try {
      setIsLoading(true);
      console.log(data);
      await axios.post(ROUTES.REGISTER, data);
      close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subTitle="Create an account!"
      />
      <Input
        errors={errors}
        label="Email"
        register={register}
        id="email"
        disabled={isLoading}
        required
      />
      <Input
        errors={errors}
        label="Name"
        register={register}
        id="name"
        disabled={isLoading}
        required
      />
      <Input
        type="password"
        errors={errors}
        label="Password"
        register={register}
        id="password"
        disabled={isLoading}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      isDisabled={isLoading}
      onClose={close}
      title="Register"
      actionLabel="Continue"
      body={bodyContent}
      onSubmit={handleSubmit(handleSubmitForm)}
    />
  );
}
