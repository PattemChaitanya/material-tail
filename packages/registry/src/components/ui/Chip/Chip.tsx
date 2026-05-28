import React from "react";
import styles from "./Chip.module.css";
import { cp } from "../../../lib/utils";

export type ChipVariant = "contained" | "outlined" | "ghost";
export type ChipColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type ChipSize = "small" | "medium" | "large";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  label: React.ReactNode;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  onDelete?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  disabled?: boolean;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant = "contained",
      color = "default",
      size = "medium",
      label,
      icon,
      avatar,
      onDelete,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick && !disabled;
    const isDeletable = !!onDelete && !disabled;

    return (
      <div
        ref={ref}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-clickable={isClickable || undefined}
        data-deletable={isDeletable || undefined}
        data-disabled={disabled || undefined}
        className={cp(styles.chip, className)}
        onClick={disabled ? undefined : onClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {avatar && <span className={styles.avatar}>{avatar}</span>}
        {!avatar && icon && <span className={styles.icon}>{icon}</span>}
        
        <span className={styles.label}>{label}</span>

        {isDeletable && (
          <span
            className={styles.deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
            role="button"
            tabIndex={0}
            aria-label="Delete"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";
