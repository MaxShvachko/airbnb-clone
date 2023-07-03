import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModalStore from './useLoginModalStore';
import { API_ROUTES } from '../constants/routes';

interface Props {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ currentUser, listingId }: Props) => {
  const { refresh } = useRouter();
  const openLoginModal = useLoginModalStore((state) => state.open);

  const isFavorite = useMemo(() => (
    currentUser?.favoriteIds?.includes(listingId)
  ), [listingId, currentUser]);

  const toggleFavorite = useCallback(async() => {
    if (!currentUser) {
      return openLoginModal();
    }

    try {
      const route = API_ROUTES.FAVORITES(listingId);

      if (isFavorite) {
        await axios.delete(route);
      } else {
        await axios.post(route);
      }
      refresh();
    } catch (error) {
      toast.error((error as ErrorResponse)?.response?.data?.error || (error as Error).message);
    }
  }, [currentUser, openLoginModal, listingId, isFavorite, refresh]);

  return { toggleFavorite, isFavorite };
};

export default useFavorite;
