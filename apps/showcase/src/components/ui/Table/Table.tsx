import React from "react";
import styles from "./Table.module.css";
import { cp } from "../../../lib/utils";

// ==========================================
// TableContainer
// ==========================================
export const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cp(styles.tableContainer, className)} {...props} />;
  }
);
TableContainer.displayName = "TableContainer";

// ==========================================
// Table
// ==========================================
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: "small" | "medium";
}
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size = "medium", ...props }, ref) => {
    return <table ref={ref} className={cp(styles.table, className)} data-size={size} {...props} />;
  }
);
Table.displayName = "Table";

// ==========================================
// TableHead
// ==========================================
export const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={cp(styles.tableHead, className)} {...props} />;
  }
);
TableHead.displayName = "TableHead";

// ==========================================
// TableBody
// ==========================================
export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={cp(styles.tableBody, className)} {...props} />;
  }
);
TableBody.displayName = "TableBody";

// ==========================================
// TableRow
// ==========================================
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
}
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover, ...props }, ref) => {
    return <tr ref={ref} className={cp(styles.tableRow, className)} data-hover={hover || undefined} {...props} />;
  }
);
TableRow.displayName = "TableRow";

// ==========================================
// TableCell
// ==========================================
export interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  variant?: "head" | "body";
}
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "inherit", variant, ...props }, ref) => {
    const Component = variant === "head" ? "th" : "td";
    return <Component ref={ref as any} className={cp(styles.tableCell, className)} data-align={align} data-variant={variant} {...props} />;
  }
);
TableCell.displayName = "TableCell";
