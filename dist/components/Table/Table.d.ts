import React from "react";
import { Theme } from "../../theme/types";
export type TableColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type SortDirection = "asc" | "desc" | false;
export interface TableColumn<T> {
    id: string;
    label: string;
    align?: "left" | "center" | "right";
    width?: number | string;
    padding?: "none" | "normal" | "checkbox";
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
}
export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    color?: TableColor;
    selectable?: boolean;
    pagination?: {
        page: number;
        rowsPerPage: number;
        totalRows: number;
        onPageChange: (page: number) => void;
        onRowsPerPageChange: (rowsPerPage: number) => void;
    };
    sorting?: {
        sortBy: string | null;
        sortDirection: SortDirection;
        onSortChange: (columnId: string) => void;
    };
    selection?: {
        selectedRows: T[];
        onSelectionChange: (selectedRows: T[]) => void;
    };
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    loading?: boolean;
}
interface TableHeadProps {
    color?: TableColor;
    theme: Theme;
    children: React.ReactNode;
}
interface TableBodyProps {
    color?: TableColor;
    theme: Theme;
    children: React.ReactNode;
}
interface TableRowProps {
    selected?: boolean;
    clickable?: boolean;
    color?: TableColor;
    theme: Theme;
    children: React.ReactNode;
}
interface TableCellProps {
    align?: "left" | "center" | "right";
    padding?: "none" | "normal" | "checkbox";
    theme: Theme;
    children: React.ReactNode;
}
interface TableHeaderCellProps {
    align?: "left" | "center" | "right";
    padding?: "none" | "normal" | "checkbox";
    sortable?: boolean;
    color?: TableColor;
    theme: Theme;
    children: React.ReactNode;
}
export declare const TableRoot: <T extends {
    id: string;
    [key: string]: any;
}>({ columns, data, color, selectable, pagination, sorting, selection, onRowClick, emptyMessage, loading, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export declare const TableHeadComponent: React.FC<TableHeadProps>;
export declare const TableBodyComponent: React.FC<TableBodyProps>;
export declare const TableRowComponent: React.FC<TableRowProps>;
export declare const TableCellComponent: React.FC<TableCellProps>;
export declare const TableHeaderCellComponent: React.FC<TableHeaderCellProps>;
export declare const Table: {
    Root: <T extends {
        id: string;
        [key: string]: any;
    }>({ columns, data, color, selectable, pagination, sorting, selection, onRowClick, emptyMessage, loading, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
    Head: React.FC<TableHeadProps>;
    Body: React.FC<TableBodyProps>;
    Row: React.FC<TableRowProps>;
    Cell: React.FC<TableCellProps>;
    HeaderCell: React.FC<TableHeaderCellProps>;
};
export {};
