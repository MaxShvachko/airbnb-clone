'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';
import { ROUTES } from '../constants/routes';

interface Props {
  title?: string;
  subTitle?: string;
  showReset? : boolean;
}

export default function EmptyState({
  title = 'No exact matches ',
  subTitle = 'Try changing or removing some of you filters ',
  showReset
}: Props) {
  const { push } = useRouter();

  const handleReset = () => push(ROUTES.HOME);

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading
        title={title}
        center
        subTitle={subTitle }
      />
      {showReset && (
        <div className="w-48 mt-4">
          <Button
            label="Remove all filters"
            onClick={handleReset}
            outline
          />
        </div>
      )}
    </div>
  );
}
