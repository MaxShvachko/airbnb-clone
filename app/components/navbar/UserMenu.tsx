'use client';

import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import useRegisterModalStore from '@/app/hooks/useRegisterModalStore';
import useRentModalStore from '@/app/hooks/useRentModalStore';
import useLoginModalStore from '@/app/hooks/useLoginModalStore';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

interface Props {
  currentUser?: User | null;
}

export default function UserMenu({ currentUser }: Props) {
  const { refresh } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const openRegisterModal = useRegisterModalStore((store) => store.open);
  const openLoginModal = useLoginModalStore((store) => store.open);
  const openRentModal = useRentModalStore((store) => store.open);

  const handleClick = () => setIsOpen((value) => !value);

  const handleOpenRegistryModal = () => {
    openRegisterModal();
    handleClick();
  };

  const handleOpenLoginModal = () => {
    openLoginModal();
    handleClick();
  };

  const handleSignOut = async() => {
    try {
      await signOut();
      toast.success('You signed out');
      refresh();
      handleClick();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleOpenRentModal = () => {
    if (!currentUser) {
      return openLoginModal();
    }

    openRentModal();
  };

  const handleOpenRentalModalFromMenu = () => {
    openRentModal();
    handleClick();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={handleOpenRentModal}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition"
        >
          Airbnb your home
        </button>
        <button
          onClick={handleClick}
          className="
            p-4 md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser
              ? (
                <>
                  <MenuItem label="My trips" onClick={() => ''} />
                  <MenuItem label="My favorites" onClick={() => ''} />
                  <MenuItem label="My reservations" onClick={() => ''} />
                  <MenuItem label="My properties" onClick={() => ''} />
                  <MenuItem label="Airbnb my home" onClick={handleOpenRentalModalFromMenu} />
                  <hr />
                  <MenuItem label="Sign out" onClick={handleSignOut} />
                </>
              )
              : (
                <>
                  <MenuItem label="Login" onClick={handleOpenLoginModal} />
                  <MenuItem label="Sign up" onClick={handleOpenRegistryModal} />
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
