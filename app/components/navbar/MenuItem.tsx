'use client';

export interface Props {
  onClick: VoidFunction;
  label: string;
}

export default function MenuItem({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left "
    >
      {label}
    </button>
  );
}
