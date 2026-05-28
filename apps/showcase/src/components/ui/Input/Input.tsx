import React from "react";
import styles from "./Input.module.css";
import { cp } from "../../../lib/utils";

export type InputVariant = "outlined" | "filled" | "standard";
export type InputColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "outlined",
      color = "primary",
      size = "medium",
      label,
      error = false,
      helperText,
      fullWidth = false,
      startIcon,
      endIcon,
      required,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // useId must be called unconditionally at the top level
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div
        data-variant={variant}
        data-color={error ? "error" : color}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        className={styles["input-root"]}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}*
              </span>
            )}
          </label>
        )}

        <div className={styles["input-container"]}>
          {startIcon && (
            <span
              className={cp(styles["icon-wrapper"], styles["icon-start"])}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            aria-required={required || undefined}
            className={cp(styles.input, className)}
            {...props}
          />

          {endIcon && (
            <span
              className={cp(styles["icon-wrapper"], styles["icon-end"])}
              aria-hidden="true"
            >
              {endIcon}
            </span>
          )}
        </div>

        {helperText && (
          <div
            id={helperId}
            className={styles["helper-text"]}
            role={error ? "alert" : undefined}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
