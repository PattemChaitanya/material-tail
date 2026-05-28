import React from "react";
export type TabsVariant = "standard" | "contained" | "fullWidth";
export type TabsColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsAlignment = "start" | "center" | "end";
export interface TabsProps {
    variant?: TabsVariant;
    color?: TabsColor;
    orientation?: TabsOrientation;
    alignment?: TabsAlignment;
    value: number;
    onChange: (value: number) => void;
    children: React.ReactNode;
    scrollable?: boolean;
}
export interface TabProps {
    value: number;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const TabsRoot: React.FC<TabsProps>;
export declare const TabsPanel: React.FC<TabProps>;
export declare const Tabs: {
    Root: React.FC<TabsProps>;
    Panel: React.FC<TabProps>;
};
