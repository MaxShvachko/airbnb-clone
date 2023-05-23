'use client';

import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import useRegisterModalStore from '@/app/hooks/useRegisterModalStore';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useRegisterModalStore((store) => store.open);

  const handleClick = () => setIsOpen((value) => !value);

  const handleOpenRegistryModal = () => {
    open();
    handleClick();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition">
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
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => (undefined)} />
            <MenuItem label="Sign up" onClick={handleOpenRegistryModal} />
          </div>
        </div>
      )}
    </div>
  );
}
