import React from "react";
export type MentionColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "default";
export interface MentionUser {
    id: string;
    name: string;
    avatar?: string;
}
export interface MentionProps {
    value: string;
    onChange: (value: string) => void;
    users: MentionUser[];
    color?: MentionColor;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    minLength?: number;
    onMentionSelect?: (user: MentionUser) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
export declare const MentionComponent: React.FC<MentionProps>;
export declare const Mention: {
    Root: React.FC<MentionProps>;
};
