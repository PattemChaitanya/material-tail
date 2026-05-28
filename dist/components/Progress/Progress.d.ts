import React from "react";
export type LinearProgressVariant = "determinate" | "indeterminate" | "buffer";
export type CircularProgressVariant = "determinate" | "indeterminate";
export type ProgressVariant = LinearProgressVariant | "circular";
export type ProgressColor = "primary" | "secondary" | "error" | "warning" | "info" | "success";
export type ProgressSize = "small" | "medium" | "large";
export interface ProgressProps {
    variant?: ProgressVariant;
    color?: ProgressColor;
    size?: ProgressSize;
    disabled?: boolean;
    value?: number;
    bufferValue?: number;
    thickness?: number;
    showValue?: boolean;
}
export declare const Progress: React.FC<ProgressProps>;
