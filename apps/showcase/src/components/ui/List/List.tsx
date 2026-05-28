import React from "react";
import styles from "./List.module.css";
import { cp } from "../../../lib/utils";

// ==========================================
// List Component
// ==========================================
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  disablePadding?: boolean;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, disablePadding = false, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cp(styles.list, className)}
        data-disable-padding={disablePadding || undefined}
        {...props}
      />
    );
  }
);
List.displayName = "List";

// ==========================================
// ListItem Component
// ==========================================
export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disablePadding?: boolean;
  button?: boolean; // If true, applies hover styles
  selected?: boolean;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, disablePadding = false, button = false, selected = false, onClick, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cp(styles.listItem, className)}
        data-disable-padding={disablePadding || undefined}
        data-button={button || undefined}
        aria-selected={selected || undefined}
        onClick={onClick}
        {...props}
      />
    );
  }
);
ListItem.displayName = "ListItem";

// ==========================================
// ListItemText Component
// ==========================================
export interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ className, primary, secondary, ...props }, ref) => {
    return (
      <div ref={ref} className={cp(styles.listItemText, className)} {...props}>
        {primary && <span className={styles.primary}>{primary}</span>}
        {secondary && <span className={styles.secondary}>{secondary}</span>}
      </div>
    );
  }
);
ListItemText.displayName = "ListItemText";

// ==========================================
// ListItemIcon Component
// ==========================================
export const ListItemIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cp(styles.listItemIcon, className)} {...props} />;
  }
);
ListItemIcon.displayName = "ListItemIcon";
