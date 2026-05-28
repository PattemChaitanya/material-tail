import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Drawer.module.css";
import { cp } from "../../../lib/utils";
import { Paper } from "../Paper";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  variant?: "temporary" | "permanent";
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, open = false, onClose, anchor = "left", variant = "temporary", children, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Prevent body scroll when temporary drawer is open
    useEffect(() => {
      if (variant === "temporary" && open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open, variant]);

    const drawerContent = (
      <Paper
        ref={ref}
        square
        elevation={16}
        className={cp(styles.paper, className)}
        data-anchor={anchor}
        data-open={open}
        data-variant={variant}
        {...props}
      >
        {children}
      </Paper>
    );

    if (variant === "permanent") {
      return (
        <div className={cp(styles.rootPermanent, className)}>
          {drawerContent}
        </div>
      );
    }

    if (!mounted) return null;

    return ReactDOM.createPortal(
      <div className={cp(styles.rootTemporary)} data-open={open} style={{ pointerEvents: open ? "auto" : "none" }}>
        <div 
          className={styles.backdrop} 
          data-open={open} 
          onClick={onClose} 
          aria-hidden="true" 
        />
        {drawerContent}
      </div>,
      document.body
    );
  }
);
Drawer.displayName = "Drawer";
