import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
}

const useRegisterModalStore = create<RegisterModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export default useRegisterModalStore;
