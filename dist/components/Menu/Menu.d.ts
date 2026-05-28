import React from "react";
export type MenuVariant = "standard" | "dense";
export type MenuColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface MenuProps {
    variant?: MenuVariant;
    color?: MenuColor;
    open: boolean;
    onClose?: () => void;
    anchorEl?: HTMLElement | null;
    children: React.ReactNode;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "right";
    };
    transformOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "right";
    };
    elevation?: number;
    dense?: boolean;
}
export interface MenuItemProps {
    onClick?: () => void;
    disabled?: boolean;
    selected?: boolean;
    dense?: boolean;
    divider?: boolean;
    children: React.ReactNode;
}
export declare const MenuComponent: React.FC<MenuProps>;
export declare const MenuItem: React.FC<MenuItemProps>;
export declare const Menu: {
    Root: React.FC<MenuProps>;
    Item: React.FC<MenuItemProps>;
};
