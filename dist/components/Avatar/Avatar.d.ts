import React from "react";
export type AvatarVariant = "circular" | "rounded" | "square";
export type AvatarColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type AvatarSize = "small" | "medium" | "large";
export interface AvatarProps {
    variant?: AvatarVariant;
    color?: AvatarColor;
    size?: AvatarSize;
    src?: string;
    alt?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    fallback?: React.ReactNode;
}
export declare const Avatar: React.FC<AvatarProps>;
