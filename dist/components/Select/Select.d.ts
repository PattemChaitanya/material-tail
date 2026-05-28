import React from "react";
export type SelectColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type SelectSize = "small" | "medium" | "large";
export type SelectVariant = "outlined" | "filled" | "standard";
export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
export interface SelectProps {
    options: SelectOption[];
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (value: string | number) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    label?: string;
    required?: boolean;
    color?: SelectColor;
    size?: SelectSize;
    variant?: SelectVariant;
}
export declare const Select: React.FC<SelectProps>;
