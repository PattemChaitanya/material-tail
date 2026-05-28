import React from "react";
export type RadioVariant = "default" | "outlined";
export type RadioColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export type RadioSize = "small" | "medium" | "large";
export interface RadioProps {
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    color?: RadioColor;
    size?: RadioSize;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    children: React.ReactNode;
}
export declare const RadioRoot: React.FC<RadioProps>;
export interface RadioGroupProps {
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    children: React.ReactNode;
}
export interface RadioItemProps {
    value: string;
    label: string;
    disabled?: boolean;
    error?: boolean;
    color?: RadioColor;
    size?: RadioSize;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}
export declare const Radio: {
    Root: React.FC<RadioProps>;
    Group: React.FC<RadioGroupProps>;
    Item: React.FC<RadioItemProps>;
};
