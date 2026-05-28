import React, { createContext, useContext, ReactNode } from "react";
import { Theme, ThemeOptions } from "./types";
import defaultTheme from "./defaultTheme";

const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={theme || defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const createTheme = (options: ThemeOptions = {}): Theme => {
  const {
    palette = {},
    typography = {},
    spacing = {},
    shape = {},
    components = {},
    zIndex = {},
    shadows = [],
  } = options;

  const theme: Theme = {
    palette: {
      ...defaultTheme.palette,
      ...palette,
    },
    typography: {
      ...defaultTheme.typography,
      ...typography,
    },
    spacing: {
      ...defaultTheme.spacing,
      ...spacing,
    },
    shape: {
      ...defaultTheme.shape,
      ...shape,
    },
    components: {
      ...defaultTheme.components,
      ...components,
    },
    zIndex: {
      ...defaultTheme.zIndex,
      ...zIndex,
    },
    shadows: shadows.length > 0 ? shadows : defaultTheme.shadows,
  };

  return theme;
};
