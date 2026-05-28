import React from "react";
import styles from "./Progress.module.css";
import { cp } from "../../../lib/utils";

export type ProgressType = "linear" | "circular";
export type ProgressColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "inherit";
export type ProgressVariant = "determinate" | "indeterminate";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ProgressType;
  color?: ProgressColor;
  variant?: ProgressVariant;
  value?: number; // 0-100 for determinate
  size?: number | string; // for circular
  thickness?: number; // for circular
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      type = "linear",
      color = "primary",
      variant = "indeterminate",
      value = 0,
      size = 40,
      thickness = 3.6,
      ...props
    },
    ref
  ) => {
    const isLinear = type === "linear";
    
    // Validate value
    const normalizedValue = Math.min(100, Math.max(0, value));

    if (isLinear) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={variant === "determinate" ? Math.round(normalizedValue) : undefined}
          data-type="linear"
          data-color={color}
          data-variant={variant}
          className={cp(styles.root, styles.linear, className)}
          {...props}
        >
          <div
            className={styles.linearBar}
            style={
              variant === "determinate"
                ? { transform: `translateX(${normalizedValue - 100}%)` }
                : undefined
            }
          />
        </div>
      );
    }

    // Circular
    const SIZE = 44;
    const center = SIZE / 2;
    const radius = center - thickness / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      variant === "determinate"
        ? circumference - (normalizedValue / 100) * circumference
        : undefined;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={variant === "determinate" ? Math.round(normalizedValue) : undefined}
        data-type="circular"
        data-color={color}
        data-variant={variant}
        className={cp(styles.root, styles.circular, className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg className={styles.circularSvg} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            className={styles.circularCircle}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            style={
              variant === "determinate"
                ? { strokeDasharray: circumference, strokeDashoffset }
                : undefined
            }
          />
        </svg>
      </div>
    );
  }
);

Progress.displayName = "Progress";
