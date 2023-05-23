'use client';

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';

export interface Props {
  body?: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  footer ?: React.ReactNode;
  isDisabled?: boolean;
  actionLabel: string;
  onSecondaryAction?: VoidFunction;
  secondaryActionLabel?: string;
}

const MODAL_CLOSE_DURATION = 300;

export default function Modal({
  body,
  title,
  isOpen,
  onClose,
  onSubmit,
  isDisabled,
  actionLabel,
  onSecondaryAction,
  secondaryActionLabel
}: Props) {
  const [isShowModal, setIsShowModal] = useState(isOpen);

  useEffect(() => {
    setIsShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isDisabled) return;

    setIsShowModal(false);
    setTimeout(() => {
      onClose();
    }, MODAL_CLOSE_DURATION);
  }, [onClose, isDisabled]);

  const handleSubmit = useCallback(() => {
    if (isDisabled) return;

    onSubmit();
  }, [onSubmit, isDisabled]);

  const handleSecondaryAction = useCallback(() => {
    if (isDisabled || !onSecondaryAction) return;

    onSecondaryAction();
  }, [onSecondaryAction, isDisabled]);

  if (!isOpen) return null;

  return (
    <>
      <div className="
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
          "
        >
          <div
            className={clsx(`
              translate duration-${MODAL_CLOSE_DURATION} h-full`,
            isShowModal && 'translate-y-0 opacity-100',
            !isShowModal && 'translate-y-full opacity-0'
            )}
          >
            <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
              "
            >
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <h2 className="text-lg font-semibold">
                  {title}
                </h2>
              </div>
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && onSecondaryAction && (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={isDisabled}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
