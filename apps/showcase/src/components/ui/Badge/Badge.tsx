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

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeContent?: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  anchorOrigin?: BadgeOrigin;
  overlap?: 'rectangular' | 'circular';
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
      anchorOrigin = { vertical: 'top', horizontal: 'right' },
      overlap = 'rectangular',
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
    const anchorOriginString = `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;

    return (
      <div className={cp(styles.root, className)} ref={ref} {...props}>
        {children}
        <span
          data-color={color}
          data-variant={variant}
          data-invisible={isHidden || undefined}
          data-anchor={anchorOriginString}
          data-overlap={overlap}
          className={styles.badge}
        >
          {variant === "standard" ? displayValue : null}
        </span>
      </div>
    );
  }
);

Badge.displayName = "Badge";
