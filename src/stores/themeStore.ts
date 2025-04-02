import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false, // Default to system preference or false
      toggleDarkMode: () => set((state) => {
        const newIsDarkMode = !state.isDarkMode;
        console.log('[themeStore] Toggling dark mode to:', newIsDarkMode); // Log state change
        return { isDarkMode: newIsDarkMode };
      }),
    }),
    {
      name: 'theme-storage', // Name for local storage item
    }
  )
); 