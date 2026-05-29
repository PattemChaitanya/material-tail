import React, { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";
import { cp } from "../../../lib/utils";

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  showCloseIcon?: boolean;
  closeIcon?: React.ReactNode;
}

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      className,
      open = false,
      onClose,
      maxWidth = "sm",
      fullWidth = false,
      fullScreen = false,
      showCloseIcon = false,
      closeIcon,
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
        data-full-screen={fullScreen || undefined}
        {...props}
      >
        <div className={styles.container}>
          {showCloseIcon && (
            <button 
              className={styles.closeButton} 
              onClick={onClose} 
              aria-label="close"
            >
              {closeIcon || (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </button>
          )}
          {children}
        </div>
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
