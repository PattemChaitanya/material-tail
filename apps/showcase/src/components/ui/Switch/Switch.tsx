import React from "react";
import styles from "./Switch.module.css";
import { cp } from "../../../lib/utils";

export type SwitchColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  color?: SwitchColor;
  size?: SwitchSize;
  label?: React.ReactNode;
  required?: boolean;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      color = "primary",
      size = "medium",
      label,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
      <div
        data-color={color}
        data-size={size}
        data-disabled={disabled || undefined}
        className={cp(styles["switch-root"], className)}
      >
        <div className={styles["switch-container"]}>
          <input
            type="checkbox"
            role="switch"
            id={switchId}
            ref={ref}
            disabled={disabled}
            required={required}
            className={styles.input}
            {...props}
          />
          <div className={styles.track} aria-hidden="true">
            <div className={styles.thumb} />
          </div>
        </div>
        {label && (
          <label htmlFor={switchId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {" "}*
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
