import React from "react";
import { ColorProps, Color } from "../types";
export type BadgeVariant = "standard" | "dot";
export type BadgeColor = Exclude<Color, "default">;
export type BadgeSize = "small" | "medium" | "large";
export type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export interface BadgeProps extends ColorProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    position?: BadgePosition;
    max?: number;
    showZero?: boolean;
    children?: React.ReactNode;
    badgeContent?: React.ReactNode;
}
export declare const Badge: React.FC<BadgeProps>;
