import React from "react";
export type HeaderColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type HeaderVariant = "elevation" | "outlined";
export interface HeaderProps {
    color?: HeaderColor;
    variant?: HeaderVariant;
    elevation?: number;
    position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
    square?: boolean;
    children?: React.ReactNode;
}
export interface HeaderToolbarProps {
    disableGutters?: boolean;
    variant?: "regular" | "dense";
    children?: React.ReactNode;
}
export interface HeaderBrandProps {
    logo?: React.ReactNode;
    title?: React.ReactNode;
    children?: React.ReactNode;
}
export interface HeaderNavProps {
    children?: React.ReactNode;
}
export interface HeaderActionsProps {
    children?: React.ReactNode;
}
export declare const HeaderComponent: ({ color, variant, elevation, position, square, children, }: HeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const HeaderToolbarComponent: ({ disableGutters, variant, children, }: HeaderToolbarProps) => import("react/jsx-runtime").JSX.Element;
export declare const HeaderBrandComponent: ({ logo, title, children, }: HeaderBrandProps) => import("react/jsx-runtime").JSX.Element;
export declare const HeaderNavComponent: ({ children }: HeaderNavProps) => import("react/jsx-runtime").JSX.Element;
export declare const HeaderActionsComponent: ({ children }: HeaderActionsProps) => import("react/jsx-runtime").JSX.Element;
export declare const Header: {
    Root: ({ color, variant, elevation, position, square, children, }: HeaderProps) => import("react/jsx-runtime").JSX.Element;
    Toolbar: ({ disableGutters, variant, children, }: HeaderToolbarProps) => import("react/jsx-runtime").JSX.Element;
    Brand: ({ logo, title, children, }: HeaderBrandProps) => import("react/jsx-runtime").JSX.Element;
    Nav: ({ children }: HeaderNavProps) => import("react/jsx-runtime").JSX.Element;
    Actions: ({ children }: HeaderActionsProps) => import("react/jsx-runtime").JSX.Element;
};
