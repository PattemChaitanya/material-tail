import React from "react";
import styles from "./Slider.module.css";
import { cp } from "../../../lib/utils";

export type SliderColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type SliderSize = "small" | "medium" | "large";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  color?: SliderColor;
  size?: SliderSize;
  label?: React.ReactNode;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      color = "primary",
      size = "medium",
      label,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const sliderId = id || generatedId;

    return (
      <div
        data-color={color}
        data-size={size}
        data-disabled={disabled || undefined}
        className={cp(styles["slider-root"], className)}
      >
        {label && (
          <label htmlFor={sliderId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles["slider-container"]}>
          <input
            type="range"
            id={sliderId}
            ref={ref}
            disabled={disabled}
            className={styles.input}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
