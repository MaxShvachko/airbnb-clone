import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
}

const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export default useSearchModalStore;
