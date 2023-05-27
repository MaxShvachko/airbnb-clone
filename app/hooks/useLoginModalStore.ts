import { create } from 'zustand';

interface LoginModalStore {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
}

const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export default useLoginModalStore;
