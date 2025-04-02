export type ThemeMode = "light" | "dark";

export interface PaletteColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
  [key: string]: string | undefined;
}

export interface Palette {
  mode: ThemeMode;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  default: PaletteColor;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
  };
  divider: string;
  common: {
    white: string;
    black: string;
  };
  grey: {
    [key: number]: string;
  };
}

export interface Typography {
  fontFamily: string;
  fontSize: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h3: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
}

export interface Spacing {
  unit: number;
  getSpacing: (multiplier: number) => string;
}

export interface Shape {
  borderRadius: number;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shape: Shape;
  zIndex: {
    appBar: number;
  };
  shadows: string[];
  components?: {
    [key: string]: any;
  };
}

export interface ThemeOptions {
  palette?: Partial<Palette>;
  typography?: Partial<Typography>;
  spacing?: Partial<Spacing>;
  shape?: Partial<Shape>;
  components?: {
    [key: string]: any;
  };
}
