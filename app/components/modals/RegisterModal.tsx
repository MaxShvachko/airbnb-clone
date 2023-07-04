'use client';

import axios from 'axios';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import useRegisterModalStore from '@/app/hooks/useRegisterModalStore';
import useLoginModalStore from '@/app/hooks/useLoginModalStore';
import { API_ROUTES } from '@/app/constants/routes';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const DEFAULT_FORM_VALUES = {
  name: '',
  email: '',
  password: ''
};

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useRegisterModalStore((store) => store.isOpen);
  const openLoginModal = useLoginModalStore((store) => store.open);
  const close = useRegisterModalStore((store) => store.close);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: DEFAULT_FORM_VALUES
  });

  const handleSubmitForm: SubmitHandler<FieldValues> = async(data) => {
    try {
      setIsLoading(true);
      await axios.post(API_ROUTES.REGISTER, data);
      close();
      openLoginModal();
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenLogInModal = () => {
    close();
    openLoginModal();
  };

  const handleThirdPartyRegister = (provider: 'github' | 'google') => async() => {
    try {
      setIsLoading(true);
      const response = await signIn(provider);

      if (response?.error) {
        toast.error(response?.error);
        return;
      }
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={handleThirdPartyRegister('google')}
      />
      <Button
        outline
        label="Continue with github"
        icon={AiFillGithub}
        onClick={handleThirdPartyRegister('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap 2">
          <span>Already have an account?</span>
          &nbsp;
          <button onClick={handleOpenLogInModal} className="text-neutral-800 hover:underline">
            Log in
          </button>
        </div>
      </div>
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
      footer={footerContent}
      onSubmit={handleSubmit(handleSubmitForm)}
    />
  );
}
