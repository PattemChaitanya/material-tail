import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Menu.module.css";
import { cp } from "../../../lib/utils";

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, open, anchorEl, onClose, children, ...props }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref || menuRef) as React.MutableRefObject<HTMLDivElement | null>;
    
    // Position state
    const [position, setPosition] = useState({ top: 0, left: 0, minWidth: 0 });

    useEffect(() => {
      if (open && anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          minWidth: rect.width,
        });
      }
    }, [open, anchorEl]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          open &&
          combinedRef.current &&
          !combinedRef.current.contains(event.target as Node) &&
          anchorEl &&
          !anchorEl.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, onClose, anchorEl, combinedRef]);

    if (!open) return null;

    const content = (
      <div
        ref={combinedRef}
        className={cp(styles.menu, className)}
        style={{ top: position.top, left: position.left, minWidth: position.minWidth }}
        role="menu"
        {...props}
      >
        <ul className={styles.list} role="presentation">
          {children}
        </ul>
      </div>
    );

    return typeof document !== "undefined"
      ? ReactDOM.createPortal(content, document.body)
      : content;
  }
);

Menu.displayName = "Menu";

export interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  ({ className, disabled, onClick, ...props }, ref) => {
    return (
      <li
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        data-disabled={disabled || undefined}
        className={cp(styles.menuItem, className)}
        onClick={(e) => {
          if (!disabled && onClick) {
            onClick(e);
          }
        }}
        {...props}
      />
    );
  }
);

MenuItem.displayName = "MenuItem";
