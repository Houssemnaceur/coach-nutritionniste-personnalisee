import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "@/lib/store";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { user, updateUser } = useStore();
  const [theme, setTheme] = useState<Theme>(user.darkMode ? "dark" : "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setTheme(user.darkMode ? "dark" : "light");
  }, [user.darkMode]);

  const toggleTheme = () => {
    const newDarkMode = !user.darkMode;
    updateUser({ darkMode: newDarkMode });
    setTheme(newDarkMode ? "dark" : "light");
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};