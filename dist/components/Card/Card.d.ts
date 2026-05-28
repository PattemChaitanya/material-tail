import React from "react";
export type CardColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type CardVariant = "elevation" | "outlined";
export interface CardProps {
    color?: CardColor;
    variant?: CardVariant;
    elevation?: number;
    square?: boolean;
    children?: React.ReactNode;
}
export interface CardHeaderProps {
    avatar?: React.ReactNode;
    title?: React.ReactNode;
    subheader?: React.ReactNode;
    action?: React.ReactNode;
    disableTypography?: boolean;
}
export interface CardMediaProps {
    image?: string;
    component?: React.ElementType;
    height?: number | string;
    children?: React.ReactNode;
}
export interface CardContentProps {
    children?: React.ReactNode;
}
export interface CardActionsProps {
    disableSpacing?: boolean;
    children?: React.ReactNode;
}
export declare const CardComponent: ({ color, variant, elevation, square, children, }: CardProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardHeaderComponent: ({ avatar, title, subheader, action, disableTypography, }: CardHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardMediaComponent: ({ image, component: Component, height, children, }: CardMediaProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardContentComponent: ({ children }: CardContentProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardActionsComponent: ({ disableSpacing, children, }: CardActionsProps) => import("react/jsx-runtime").JSX.Element;
export declare const Card: {
    Root: ({ color, variant, elevation, square, children, }: CardProps) => import("react/jsx-runtime").JSX.Element;
    Header: ({ avatar, title, subheader, action, disableTypography, }: CardHeaderProps) => import("react/jsx-runtime").JSX.Element;
    Media: ({ image, component: Component, height, children, }: CardMediaProps) => import("react/jsx-runtime").JSX.Element;
    Content: ({ children }: CardContentProps) => import("react/jsx-runtime").JSX.Element;
    Actions: ({ disableSpacing, children, }: CardActionsProps) => import("react/jsx-runtime").JSX.Element;
};
