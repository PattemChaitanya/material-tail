import React from "react";
import { Theme } from "../../theme/types";
export type SidebarVariant = "permanent" | "persistent" | "temporary";
export type SidebarColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface SidebarProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    open?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    width?: number;
    elevation?: number;
}
export interface SidebarContentProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    theme: Theme;
    children?: React.ReactNode;
}
export interface SidebarHeaderProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    theme: Theme;
    children?: React.ReactNode;
}
export interface SidebarTitleProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    theme: Theme;
    children?: React.ReactNode;
}
export interface SidebarBodyProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    theme: Theme;
    children?: React.ReactNode;
}
export interface SidebarFooterProps {
    variant?: SidebarVariant;
    color?: SidebarColor;
    theme: Theme;
    children?: React.ReactNode;
}
export declare const SidebarRoot: React.FC<SidebarProps>;
export declare const SidebarHeader: React.FC<Omit<SidebarHeaderProps, "theme">>;
export declare const SidebarTitle: React.FC<Omit<SidebarTitleProps, "theme">>;
export declare const SidebarBody: React.FC<Omit<SidebarBodyProps, "theme">>;
export declare const SidebarFooter: React.FC<Omit<SidebarFooterProps, "theme">>;
export declare const Sidebar: {
    Root: React.FC<SidebarProps>;
    Header: React.FC<Omit<SidebarHeaderProps, "theme">>;
    Title: React.FC<Omit<SidebarTitleProps, "theme">>;
    Body: React.FC<Omit<SidebarBodyProps, "theme">>;
    Footer: React.FC<Omit<SidebarFooterProps, "theme">>;
};
