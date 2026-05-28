import React from "react";
export type ChipVariant = "filled" | "outlined" | "text";
export type ChipColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type ChipSize = "small" | "medium" | "large";
export interface ChipProps {
    variant?: ChipVariant;
    color?: ChipColor;
    size?: ChipSize;
    disabled?: boolean;
    clickable?: boolean;
    deletable?: boolean;
    label: string;
    onClick?: () => void;
    onDelete?: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    avatar?: React.ReactNode;
}
export declare const Chip: React.FC<ChipProps>;
