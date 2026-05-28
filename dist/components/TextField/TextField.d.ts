import React from "react";
export type TextFieldVariant = "outlined" | "filled" | "standard";
export type TextFieldColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export type TextFieldSize = "small" | "medium" | "large";
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: TextFieldVariant;
    color?: TextFieldColor;
    size?: TextFieldSize;
    label?: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    maxRows?: number;
}
export declare const TextField: React.FC<TextFieldProps>;
