import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    let isSubscribed = true; // Track subscription status

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (isSubscribed) {
        setIsDarkMode(colorScheme === 'dark');
      }
    });

    // Cleanup function to ensure the listener is removed properly
    return () => {
      isSubscribed = false;
      subscription.remove();
    };
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
