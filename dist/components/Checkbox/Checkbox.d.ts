import React from "react";
export type CheckboxVariant = "default" | "outlined";
export type CheckboxColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export type CheckboxSize = "small" | "medium" | "large";
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: CheckboxVariant;
    color?: CheckboxColor;
    size?: CheckboxSize;
    label?: string;
    error?: boolean;
    indeterminate?: boolean;
    required?: boolean;
}
export declare const Checkbox: React.FC<CheckboxProps>;
