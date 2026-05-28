import React from "react";
export type SwitchVariant = "default" | "outlined";
export type SwitchColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export type SwitchSize = "small" | "medium" | "large";
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: SwitchVariant;
    color?: SwitchColor;
    size?: SwitchSize;
    label?: string;
    error?: boolean;
    required?: boolean;
}
export declare const Switch: React.FC<SwitchProps>;
