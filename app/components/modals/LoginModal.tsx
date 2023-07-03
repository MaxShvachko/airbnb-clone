'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useRegisterModalStore from '@/app/hooks/useRegisterModalStore';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import useLoginModalStore from '@/app/hooks/useLoginModalStore';

const DEFAULT_FORM_VALUES = {
  email: '',
  password: ''
};

export default function LoginModal() {
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useLoginModalStore((store) => store.isOpen);
  const openRegisterModal = useRegisterModalStore((store) => store.open);
  const close = useLoginModalStore((store) => store.close);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: DEFAULT_FORM_VALUES
  });

  const handleSubmitForm: SubmitHandler<FieldValues> = async(data) => {
    try {
      setIsLoading(true);
      const response = await signIn('credentials', { redirect: false, ...data });

      if (response?.error) {
        toast.error(response?.error);
        return;
      }

      toast.success('Logged in');
      refresh();
      close();
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpeRegisterInModal = () => {
    close();
    openRegisterModal();
  };

  const handleThirdPartyLogin = (provider: 'github' | 'google') => async() => {
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
        title="Welcome back"
        subTitle="Login to your account!"
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
        onClick={handleThirdPartyLogin('google')}
      />
      <Button
        outline
        label="Continue with github"
        icon={AiFillGithub}
        onClick={handleThirdPartyLogin('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap 2">
          <span>Haven`t an account?</span>
          &nbsp;
          <button onClick={handleOpeRegisterInModal} className="text-neutral-800 hover:underline">
            Register now
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
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      onSubmit={handleSubmit(handleSubmitForm)}
    />
  );
}
