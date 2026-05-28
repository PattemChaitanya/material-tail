import React, { useEffect } from "react";
import styles from "./Snackbar.module.css";
import { cp } from "../../../lib/utils";

export type SnackbarOrigin = {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
};

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  autoHideDuration?: number | null;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message?: React.ReactNode;
  action?: React.ReactNode;
  anchorOrigin?: SnackbarOrigin;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      className,
      open = false,
      autoHideDuration = null,
      onClose,
      message,
      action,
      anchorOrigin = { vertical: "bottom", horizontal: "left" },
      children,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (open && autoHideDuration != null && autoHideDuration > 0) {
        const timer = setTimeout(() => {
          onClose?.(undefined, "timeout");
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    }, [open, autoHideDuration, onClose]);

    // We keep it in the DOM to allow for exit animations via CSS.
    // If you prefer to unmount completely, you can conditionally render based on a local state synced with `open`.

    return (
      <div
        ref={ref}
        role="presentation"
        className={cp(styles.root, className)}
        data-vertical={anchorOrigin.vertical}
        data-horizontal={anchorOrigin.horizontal}
        data-open={open || undefined}
        {...props}
      >
        <div className={styles.container} role="alert" aria-live="polite">
          {children ? (
            children
          ) : (
            <div className={styles.content}>
              <div className={styles.message}>{message}</div>
              {action && <div className={styles.action}>{action}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Snackbar.displayName = "Snackbar";
