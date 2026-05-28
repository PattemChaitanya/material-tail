import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type SwitchVariant = "default" | "outlined";
export type SwitchColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: SwitchVariant;
  color?: SwitchColor;
  size?: SwitchSize;
  label?: string;
  error?: boolean;
  required?: boolean;
}

interface SwitchWrapperProps {
  disabled?: boolean;
}

const SwitchWrapper = styled.div<SwitchWrapperProps>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

interface SwitchInputWrapperProps {
  variant?: SwitchVariant;
  color?: SwitchColor;
  size: SwitchSize;
  error?: boolean;
  theme: Theme;
}

const SwitchInputWrapper = styled.div<SwitchInputWrapperProps>`
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + span {
      background-color: ${({ color = "primary", theme }) =>
        theme.palette[color].main};
      border-color: ${({ color = "primary", theme }) =>
        theme.palette[color].main};
    }

    &:checked + span:before {
      transform: translateX(
        ${({ size }) => {
          switch (size) {
            case "small":
              return "16px";
            case "large":
              return "24px";
            default:
              return "20px";
          }
        }}
      );
      background-color: ${({ theme }) => theme.palette.background.paper};
    }

    &:focus + span {
      box-shadow: 0 0 0 2px
        ${({ color = "primary", theme }) => theme.palette[color].main}40;
    }

    &:disabled + span {
      background-color: ${({ theme }) => theme.palette.background.paper};
      border-color: ${({ theme }) => theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:disabled:checked + span {
      background-color: ${({ theme }) => theme.palette.text.disabled};
    }
  }
`;

interface SwitchSpanProps {
  variant?: SwitchVariant;
  color?: SwitchColor;
  size: SwitchSize;
  error?: boolean;
  theme: Theme;
}

const SwitchSpan = styled.span<SwitchSpanProps>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid
    ${(props) =>
      props.error
        ? props.theme.palette.error.main
        : props.theme.palette[props.color || "primary"].main};
  border-radius: ${(props) => (props.variant === "outlined" ? "4px" : "34px")};
  background-color: ${(props) => props.theme.palette.background.paper};
  transition: all 0.2s ease-in-out;

  ${(props) => {
    switch (props.size) {
      case "small":
        return `
          width: 36px;
          height: 20px;
        `;
      case "large":
        return `
          width: 52px;
          height: 28px;
        `;
      default:
        return `
          width: 44px;
          height: 24px;
        `;
    }
  }}

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: ${(props) => {
      switch (props.size) {
        case "small":
          return "12px";
        case "large":
          return "20px";
        default:
          return "16px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "12px";
        case "large":
          return "20px";
        default:
          return "16px";
      }
    }};
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].main};
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
  }
`;

interface LabelProps {
  size: SwitchSize;
  disabled?: boolean;
  error?: boolean;
  color?: SwitchColor;
  theme: Theme;
}

const Label = styled.label<LabelProps>`
  margin-left: ${(props) => (props.size === "small" ? "8px" : "12px")};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) =>
    props.size === "small"
      ? "0.875rem"
      : props.size === "large"
      ? "1.25rem"
      : "1rem"};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.text.disabled
      : props.error
      ? props.theme.palette.error.main
      : props.theme.palette.text.primary};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const Switch: React.FC<SwitchProps> = ({
  variant = "default",
  color = "primary",
  size = "medium",
  label,
  error,
  required,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  return (
    <SwitchWrapper disabled={disabled}>
      <SwitchInputWrapper
        variant={variant}
        color={color}
        size={size}
        error={error}
        theme={theme}
      >
        <input type="checkbox" role="switch" disabled={disabled} {...props} />
        <SwitchSpan
          theme={theme}
          variant={variant}
          color={color}
          size={size}
          error={error}
        />
      </SwitchInputWrapper>
      {label && (
        <Label
          theme={theme}
          size={size}
          disabled={disabled}
          error={error}
          color={color}
        >
          {label}
          {required && " *"}
        </Label>
      )}
    </SwitchWrapper>
  );
};
