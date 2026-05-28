import React from "react";
import styles from "./AppBar.module.css";
import { cp } from "../../../lib/utils";
import { Paper, PaperProps } from "../Paper";

// ==========================================
// AppBar Component
// ==========================================
export interface AppBarProps extends PaperProps {
  color?: "primary" | "secondary" | "default" | "transparent" | "inherit";
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  ({ className, color = "primary", position = "fixed", elevation = 4, square = true, ...props }, ref) => {
    return (
      <Paper
        ref={ref}
        square={square}
        elevation={elevation}
        className={cp(styles.appBar, className)}
        data-color={color}
        data-position={position}
        {...props}
      />
    );
  }
);
AppBar.displayName = "AppBar";

// ==========================================
// Toolbar Component
// ==========================================
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "regular" | "dense";
  disableGutters?: boolean;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, variant = "regular", disableGutters = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cp(styles.toolbar, className)}
        data-variant={variant}
        data-disable-gutters={disableGutters || undefined}
        {...props}
      />
    );
  }
);
Toolbar.displayName = "Toolbar";
