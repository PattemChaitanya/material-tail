import React from "react";
export type DialogVariant = "standard" | "fullscreen";
export type DialogSize = "small" | "medium" | "large" | "fullscreen";
export type DialogColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface DialogProps {
    variant?: DialogVariant;
    size?: DialogSize;
    color?: DialogColor;
    open: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    actions?: React.ReactNode;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    maxWidth?: boolean;
    fullWidth?: boolean;
}
export declare const DialogRoot: React.FC<DialogProps>;
export interface DialogTitleProps {
    children: React.ReactNode;
}
export interface DialogContentProps {
    children: React.ReactNode;
}
export interface DialogActionsProps {
    children: React.ReactNode;
}
export declare const DialogTitleComponent: React.FC<DialogTitleProps>;
export declare const DialogContentComponent: React.FC<DialogContentProps>;
export declare const DialogActionsComponent: React.FC<DialogActionsProps>;
export declare const Dialog: {
    Root: React.FC<DialogProps>;
    Title: React.FC<DialogTitleProps>;
    Content: React.FC<DialogContentProps>;
    Actions: React.FC<DialogActionsProps>;
};
