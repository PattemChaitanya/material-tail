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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "size"> {
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
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
      multiline = false,
      rows = 3,
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
        data-multiline={multiline || undefined}
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

          {multiline ? (
            <textarea
              id={inputId}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              disabled={disabled}
              required={required}
              rows={rows}
              aria-invalid={error || undefined}
              aria-describedby={helperId}
              aria-required={required || undefined}
              className={cp(styles.input, className)}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              ref={ref as React.Ref<HTMLInputElement>}
              disabled={disabled}
              required={required}
              aria-invalid={error || undefined}
              aria-describedby={helperId}
              aria-required={required || undefined}
              className={cp(styles.input, className)}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

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
