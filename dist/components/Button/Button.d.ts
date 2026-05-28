import React from "react";
export type ButtonVariant = "text" | "outlined" | "contained" | "elevated";
export type ButtonColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
