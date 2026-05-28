export type PaginationColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type PaginationVariant = "text" | "outlined" | "contained";
export interface PaginationProps {
    page: number;
    count: number;
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
    color?: PaginationColor;
    variant?: PaginationVariant;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    disabled?: boolean;
    onPageChange: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
}
export declare const PaginationComponent: ({ page, count, rowsPerPage, rowsPerPageOptions, color, variant, showFirstButton, showLastButton, disabled, onPageChange, onRowsPerPageChange, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
export declare const Pagination: {
    Root: ({ page, count, rowsPerPage, rowsPerPageOptions, color, variant, showFirstButton, showLastButton, disabled, onPageChange, onRowsPerPageChange, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
};
