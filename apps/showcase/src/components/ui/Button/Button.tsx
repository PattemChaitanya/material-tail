import React from "react";
import styles from "./Button.module.css";
import { cp } from "../../../lib/utils";

export type ButtonVariant = "contained" | "outlined" | "text" | "ghost";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "contained",
      color = "primary",
      size = "medium",
      fullWidth = false,
      loading = false,
      disabled,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-loading={loading || undefined}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cp(styles.button, className)}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {startIcon && !loading && (
          <span className={styles["icon-start"]} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className={loading ? styles["loading-text"] : undefined}>
          {children}
        </span>
        {endIcon && !loading && (
          <span className={styles["icon-end"]} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
