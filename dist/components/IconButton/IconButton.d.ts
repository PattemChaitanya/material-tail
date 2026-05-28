import React from "react";
export type IconButtonSize = "small" | "medium" | "large";
export type IconButtonColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
    size?: IconButtonSize;
    color?: IconButtonColor;
    disabled?: boolean;
    children: React.ReactNode;
}
export declare const IconButton: React.FC<IconButtonProps>;
