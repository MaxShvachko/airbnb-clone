'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { UseFormWatch, FieldValues } from 'react-hook-form';
import { TbPhotoPlus } from 'react-icons/tb';

export interface Props {
  name: string;
  onChange: (name: string, value: string) => void;
  watch: UseFormWatch<FieldValues>;
}

export default function ImageUpload({
  name,
  onChange,
  watch
}: Props) {
  const value = watch(name);

  const handleUpload = useCallback((result: UploadResult) => {
    onChange(name, result.info.secure_url);
  }, [onChange, name]) ;

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <button
          className="
            relative
            hover:opacity-70
            hover:border-neutral-300
            transition
            border-dashed
            border-2
            p-20
            border-neutral-400
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
          onClick={() => open?.()}
        >
          <TbPhotoPlus size={50} />
          <span className="font-semibold text-lg">
            Click to upload
          </span>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={value}
                fill
                style={{ objectFit: 'cover' }}
                alt="Uploaded image"
              />
            </div>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
}
