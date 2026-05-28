import React, { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";
import { cp } from "../../../lib/utils";

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
}

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      className,
      open = false,
      onClose,
      maxWidth = "sm",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    const dialogRef = (ref || internalRef) as React.MutableRefObject<HTMLDialogElement | null>;

    useEffect(() => {
      const dialogNode = dialogRef.current;
      if (!dialogNode) return;

      if (open) {
        if (!dialogNode.open) {
          dialogNode.showModal();
        }
      } else {
        if (dialogNode.open) {
          dialogNode.close();
        }
      }
    }, [open, dialogRef]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose?.();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        className={cp(styles.dialog, className)}
        onClick={handleBackdropClick}
        onCancel={(e) => {
          e.preventDefault();
          onClose?.();
        }}
        data-max-width={maxWidth || undefined}
        data-full-width={fullWidth || undefined}
        {...props}
      >
        <div className={styles.container}>{children}</div>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cp(styles.title, className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cp(styles.content, className)} {...props} />
  )
);
DialogContent.displayName = "DialogContent";

export const DialogActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cp(styles.actions, className)} {...props} />
  )
);
DialogActions.displayName = "DialogActions";
