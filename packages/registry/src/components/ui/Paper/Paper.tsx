import React from "react";
import styles from "./Paper.module.css";
import { cp } from "../../../lib/utils";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3 | 4 | 8 | 12 | 16 | 24;
  variant?: "elevation" | "outlined";
  square?: boolean;
}

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, elevation = 1, variant = "elevation", square = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cp(styles.root, className)}
        data-variant={variant}
        data-elevation={elevation}
        data-square={square || undefined}
        {...props}
      />
    );
  }
);
Paper.displayName = "Paper";
