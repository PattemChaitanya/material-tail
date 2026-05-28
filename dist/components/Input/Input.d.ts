import React from "react";
import { Theme } from "../../theme/types";
export type InputVariant = "outlined" | "filled" | "standard";
export type InputColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export type InputSize = "small" | "medium" | "large";
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: InputVariant;
    color?: InputColor;
    size?: InputSize;
    label?: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    required?: boolean;
    theme?: Theme;
}
export declare const Input: React.FC<InputProps>;
