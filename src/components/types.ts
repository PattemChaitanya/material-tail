import { Theme } from "../theme/types";

export interface StyledProps {
  theme: Theme;
}

export type Color =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export interface ColorProps {
  color?: Color | "default";
}
