import React from "react";
import styles from "./Select.module.css";
import { cp } from "../../../lib/utils";

export type SelectVariant = "outlined" | "filled" | "standard";
export type SelectColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type SelectSize = "small" | "medium" | "large";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: SelectVariant;
  color?: SelectColor;
  size?: SelectSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
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
      required,
      disabled,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    return (
      <div
        data-variant={variant}
        data-color={error ? "error" : color}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        className={styles["select-root"]}
      >
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}*
              </span>
            )}
          </label>
        )}

        <div className={styles["select-container"]}>
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            aria-required={required || undefined}
            className={cp(styles.select, className)}
            {...props}
          >
            {children}
          </select>

          <span className={styles["icon-wrapper"]} aria-hidden="true">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={styles.icon}
            >
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </span>
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

Select.displayName = "Select";
