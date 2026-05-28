import React from "react";
import styles from "./Badge.module.css";
import { cp } from "../../../lib/utils";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type BadgeVariant = "standard" | "dot";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeContent?: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      badgeContent,
      color = "primary",
      variant = "standard",
      max = 99,
      showZero = false,
      invisible = false,
      children,
      ...props
    },
    ref
  ) => {
    let displayValue: React.ReactNode = badgeContent;

    if (variant !== "dot" && typeof badgeContent === "number") {
      if (badgeContent > max) {
        displayValue = `${max}+`;
      } else if (badgeContent === 0 && !showZero) {
        invisible = true;
      }
    }

    const isHidden = invisible || (variant === "standard" && (badgeContent === undefined || badgeContent === null));

    return (
      <div className={cp(styles.root, className)} ref={ref} {...props}>
        {children}
        <span
          data-color={color}
          data-variant={variant}
          data-invisible={isHidden || undefined}
          className={styles.badge}
        >
          {variant === "standard" ? displayValue : null}
        </span>
      </div>
    );
  }
);

Badge.displayName = "Badge";
