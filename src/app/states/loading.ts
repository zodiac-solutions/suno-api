import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingData {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingData>()(
  devtools((set) => ({
    isLoading: false,
    setLoading: (isLoading) => set(() => ({ isLoading })),
  })),
);
