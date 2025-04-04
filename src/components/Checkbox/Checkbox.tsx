import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { Theme } from "../../theme/types";

export type CheckboxVariant = "default" | "outlined";
export type CheckboxColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: string;
  error?: boolean;
  indeterminate?: boolean;
  required?: boolean;
}

interface CheckboxWrapperStyledProps {
  theme: Theme;
  $disabled?: boolean;
}

const CheckboxWrapper = styled.div<CheckboxWrapperStyledProps>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${({ $disabled }: CheckboxWrapperStyledProps) =>
    $disabled ? "not-allowed" : "pointer"};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

interface CheckboxInputStyledProps {
  theme: Theme;
  $variant?: CheckboxVariant;
  $color?: CheckboxColor;
  $size?: CheckboxSize;
  $error?: boolean;
  $indeterminate?: boolean;
}

const CheckboxInput = styled.input<CheckboxInputStyledProps>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: ${({ $color, theme }: CheckboxInputStyledProps) =>
      theme.palette[$color || "primary"].main};
    border-color: ${({ $color, theme }: CheckboxInputStyledProps) =>
      theme.palette[$color || "primary"].main};
    color: ${({ theme }: CheckboxInputStyledProps) =>
      theme.palette.background.paper};
  }

  &:checked + span:after {
    display: block;
  }

  &:focus + span {
    box-shadow: 0 0 0 2px
      ${({ $color, theme }: CheckboxInputStyledProps) =>
        theme.palette[$color || "primary"].main}40;
  }

  &:disabled + span {
    background-color: ${({ theme }: CheckboxInputStyledProps) =>
      theme.palette.background.paper};
    border-color: ${({ theme }: CheckboxInputStyledProps) =>
      theme.palette.text.disabled};
    cursor: not-allowed;
  }

  &:disabled:checked + span {
    background-color: ${({ theme }: CheckboxInputStyledProps) =>
      theme.palette.text.disabled};
  }
`;

interface CheckboxSpanStyledProps {
  theme: Theme;
  $variant?: CheckboxVariant;
  $color?: CheckboxColor;
  $size?: CheckboxSize;
  $error?: boolean;
  $indeterminate?: boolean;
}

const CheckboxSpan = styled.span<CheckboxSpanStyledProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 2px solid
    ${({ $error, $color, theme }: CheckboxSpanStyledProps) =>
      $error
        ? theme.palette.error.main
        : theme.palette[$color || "primary"].main};
  border-radius: ${({ $variant }: CheckboxSpanStyledProps) =>
    $variant === "outlined" ? "4px" : "50%"};
  background-color: ${({ theme }: CheckboxSpanStyledProps) =>
    theme.palette.background.paper};
  transition: all 0.2s ease-in-out;

  ${({ $size }: CheckboxSpanStyledProps) => {
    switch ($size) {
      case "small":
        return `
          width: 16px;
          height: 16px;
        `;
      case "large":
        return `
          width: 24px;
          height: 24px;
        `;
      default:
        return `
          width: 20px;
          height: 20px;
        `;
    }
  }}

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  ${({ $indeterminate, $color, theme }: CheckboxSpanStyledProps) =>
    $indeterminate
      ? `
    background-color: ${theme.palette[$color || "primary"].main};
    border-color: ${theme.palette[$color || "primary"].main};
    color: ${theme.palette.background.paper};

    &:after {
      display: block;
      width: 10px;
      height: 2px;
      border: none;
      background-color: ${theme.palette.background.paper};
      transform: translate(-50%, -50%);
    }
  `
      : ""}
`;

interface LabelStyledProps {
  theme: Theme;
  $size?: CheckboxSize;
  $disabled?: boolean;
  $error?: boolean;
  $color?: CheckboxColor;
}

const Label = styled.label<LabelStyledProps>`
  margin-left: ${({ $size }: LabelStyledProps) =>
    $size === "small" ? "8px" : "12px"};
  font-family: ${({ theme }: LabelStyledProps) => theme.typography.fontFamily};
  font-size: ${({ $size }: LabelStyledProps) =>
    $size === "small" ? "0.875rem" : $size === "large" ? "1.25rem" : "1rem"};
  color: ${({ $disabled, $error, $color, theme }: LabelStyledProps) =>
    $disabled
      ? theme.palette.text.disabled
      : $error
      ? theme.palette.error.main
      : theme.palette.text.primary};
  cursor: ${({ $disabled }: LabelStyledProps) =>
    $disabled ? "not-allowed" : "pointer"};
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  variant = "default",
  color = "primary",
  size = "medium",
  label,
  error,
  indeterminate,
  required,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  return (
    <CheckboxWrapper theme={theme} $disabled={disabled}>
      <CheckboxInput
        type="checkbox"
        theme={theme}
        $variant={variant}
        $color={color}
        $size={size}
        $error={error}
        $indeterminate={indeterminate}
        disabled={disabled}
        {...props}
      />
      <CheckboxSpan
        theme={theme}
        $variant={variant}
        $color={color}
        $size={size}
        $error={error}
        $indeterminate={indeterminate}
      />
      {label && (
        <Label
          theme={theme}
          $size={size}
          $disabled={disabled}
          $error={error}
          $color={color}
        >
          {label}
          {required && " *"}
        </Label>
      )}
    </CheckboxWrapper>
  );
};
