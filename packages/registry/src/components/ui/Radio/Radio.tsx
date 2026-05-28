import React from "react";
import styles from "./Radio.module.css";
import { cp } from "../../../lib/utils";

export type RadioColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type RadioSize = "small" | "medium" | "large";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  color?: RadioColor;
  size?: RadioSize;
  label?: React.ReactNode;
  error?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
    const radioId = id || generatedId;

    return (
      <div
        data-color={error ? "error" : color}
        data-size={size}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        className={cp(styles["radio-root"], className)}
      >
        <div className={styles["radio-container"]}>
          <input
            type="radio"
            id={radioId}
            ref={ref}
            disabled={disabled}
            aria-invalid={error || undefined}
            className={styles.input}
            {...props}
          />
          <div className={styles.control} aria-hidden="true">
            <div className={styles.dot} />
          </div>
        </div>
        {label && (
          <label htmlFor={radioId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
