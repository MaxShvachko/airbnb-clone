import { create } from 'zustand';

interface RentModalStore {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
}

const useRentModalStore = create<RentModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export default useRentModalStore;
