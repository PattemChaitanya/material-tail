import React from "react";
import styles from "./Tooltip.module.css";
import { cp } from "../../../lib/utils";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  arrow?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    { className, title, placement = "bottom", children, arrow = false, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cp(styles.wrapper, className)}
        data-placement={placement}
        data-arrow={arrow || undefined}
        {...props}
      >
        {children}
        <div className={styles.tooltip} role="tooltip">
          {title}
          {arrow && <span className={styles.arrow} />}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
