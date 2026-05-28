import React from "react";
import styles from "./Checkbox.module.css";
import { cp } from "../../../lib/utils";

export type CheckboxColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: React.ReactNode;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      color = "primary",
      size = "medium",
      label,
      error = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div
        data-color={error ? "error" : color}
        data-size={size}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        className={cp(styles["checkbox-root"], className)}
      >
        <div className={styles["checkbox-container"]}>
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            disabled={disabled}
            aria-invalid={error || undefined}
            className={styles.input}
            {...props}
          />
          <div className={styles.control} aria-hidden="true">
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12L10 17L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
