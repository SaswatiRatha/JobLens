import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./theme.context.js";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = localStorage.getItem("joblens-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("joblens-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app-shell ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
