import React, { ReactNode } from "react";
import { Theme, ThemeOptions } from "./types";
export declare const useTheme: () => Theme;
interface ThemeProviderProps {
    theme?: Theme;
    children: ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const createTheme: (options?: ThemeOptions) => Theme;
export {};
