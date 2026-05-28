import React from "react";
export type TooltipVariant = "standard" | "light" | "dark";
export type TooltipColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type TooltipSize = "small" | "medium" | "large";
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export interface TooltipProps {
    variant?: TooltipVariant;
    color?: TooltipColor;
    size?: TooltipSize;
    position?: TooltipPosition;
    arrow?: boolean;
    enterDelay?: number;
    leaveDelay?: number;
    children: React.ReactNode;
    title: React.ReactNode;
}
export declare const Tooltip: React.FC<TooltipProps>;
