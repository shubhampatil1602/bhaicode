import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        console.log("Theme store: Setting theme to", theme);
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
