import React from "react";
export type SnackbarVariant = "standard" | "outlined";
export type SnackbarColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type SnackbarPosition = "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
export interface SnackbarProps {
    variant?: SnackbarVariant;
    color?: SnackbarColor;
    position?: SnackbarPosition;
    open: boolean;
    onClose?: () => void;
    message: React.ReactNode;
    action?: React.ReactNode;
    autoHideDuration?: number;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}
export declare const Snackbar: React.FC<SnackbarProps>;
