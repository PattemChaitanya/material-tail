import React from "react";
export type SliderColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    color?: SliderColor;
    onChange?: (value: number) => void;
    onChangeCommitted?: (value: number) => void;
    marks?: boolean | {
        value: number;
        label: string;
    }[];
    valueLabelDisplay?: "auto" | "on" | "off";
    valueLabelFormat?: (value: number) => string;
    orientation?: "horizontal" | "vertical";
    size?: "small" | "medium";
    track?: "normal" | "inverted" | false;
    thumb?: boolean;
}
export declare const Slider: React.FC<SliderProps>;
