import React from "react";
export type ListColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type ListVariant = "text" | "outlined" | "contained";
export interface ListProps {
    color?: ListColor;
    variant?: ListVariant;
    dense?: boolean;
    disablePadding?: boolean;
    children?: React.ReactNode;
}
export interface ListItemProps {
    button?: boolean;
    selected?: boolean;
    disabled?: boolean;
    divider?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}
export interface ListItemTextProps {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
    inset?: boolean;
}
export interface ListItemIconProps {
    children?: React.ReactNode;
}
export interface ListItemAvatarProps {
    children?: React.ReactNode;
}
export interface ListSubheaderProps {
    children?: React.ReactNode;
    inset?: boolean;
}
export declare const ListComponent: ({ color, variant, dense, disablePadding, children, }: ListProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListItemComponent: ({ button, selected, disabled, divider, children, onClick, }: ListItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListItemTextComponent: ({ primary, secondary, inset, }: ListItemTextProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListItemIconComponent: ({ children }: ListItemIconProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListItemAvatarComponent: ({ children }: ListItemAvatarProps) => import("react/jsx-runtime").JSX.Element;
export declare const ListSubheaderComponent: ({ children, inset, }: ListSubheaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const List: {
    Root: ({ color, variant, dense, disablePadding, children, }: ListProps) => import("react/jsx-runtime").JSX.Element;
    Item: ({ button, selected, disabled, divider, children, onClick, }: ListItemProps) => import("react/jsx-runtime").JSX.Element;
    ItemText: ({ primary, secondary, inset, }: ListItemTextProps) => import("react/jsx-runtime").JSX.Element;
    ItemIcon: ({ children }: ListItemIconProps) => import("react/jsx-runtime").JSX.Element;
    ItemAvatar: ({ children }: ListItemAvatarProps) => import("react/jsx-runtime").JSX.Element;
    Subheader: ({ children, inset, }: ListSubheaderProps) => import("react/jsx-runtime").JSX.Element;
};
