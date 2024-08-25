import { create } from "zustand";
import { InitialValues1 } from "../types/home";
import { devtools } from "zustand/middleware";

interface UserData {
  title: string;
  genre: string;
  prompt: string;
  setSongData: (songData: InitialValues1) => void;
}

export const useUserStore = create<UserData>()(
  devtools((set) => ({
    title: "",
    genre: "",
    prompt: "",
    setSongData: (songData) =>
      set((prevState) => ({ ...prevState, ...songData })),
  })),
);
