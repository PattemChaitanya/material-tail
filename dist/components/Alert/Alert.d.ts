import React from "react";
import { ColorProps } from "../types";
export type AlertVariant = "filled" | "outlined" | "text";
export type AlertColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type AlertSize = "small" | "medium" | "large";
export interface AlertProps extends ColorProps {
    variant?: AlertVariant;
    severity?: "error" | "warning" | "info" | "success";
    size?: AlertSize;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    onClose?: () => void;
    children?: React.ReactNode;
}
export declare const Alert: React.FC<AlertProps>;
