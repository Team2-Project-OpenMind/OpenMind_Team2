import { createContext, useState, useContext, useCallback } from 'react';
import { darkTheme, lightTheme } from 'components/common/Theme';
import { ThemeProvider as StyledProvider } from 'styled-components';

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(window.localStorage.getItem('theme') || 'light');
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light');
      window.localStorage.setItem('theme', 'light');
    }
  }, [themeMode]);
  return { themeMode, toggleTheme };
};
