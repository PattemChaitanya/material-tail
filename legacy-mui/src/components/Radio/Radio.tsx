import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type RadioVariant = "default" | "outlined";
export type RadioColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
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

interface RadioWrapperProps {
  disabled?: boolean;
}

const RadioWrapper = styled.div<RadioWrapperProps>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

interface RadioInputWrapperProps {
  variant?: RadioVariant;
  color?: RadioColor;
  size?: RadioSize;
  error?: boolean;
  theme: Theme;
}

const RadioInputWrapper = styled.div<RadioInputWrapperProps>`
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
      border-color: ${({ color = "primary", theme }) =>
        theme.palette[color].main};
    }

    &:checked + span:after {
      display: block;
      background-color: ${({ color = "primary", theme }) =>
        theme.palette[color].main};
    }

    &:focus + span {
      box-shadow: 0 0 0 2px
        ${({ color = "primary", theme }) => theme.palette[color].main}40;
    }

    &:disabled + span {
      border-color: ${({ theme }) => theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:disabled:checked + span:after {
      background-color: ${({ theme }) => theme.palette.text.disabled};
    }
  }
`;

interface RadioSpanProps {
  variant?: RadioVariant;
  color?: RadioColor;
  size?: RadioSize;
  error?: boolean;
  theme: Theme;
}

const RadioSpan = styled.span<RadioSpanProps>`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid
    ${(props) =>
      props.error
        ? props.theme.palette.error.main
        : props.theme.palette[props.color || "primary"].main};
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.background.paper};
  transition: all 0.2s ease-in-out;

  ${(props) => {
    switch (props.size) {
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
    top: 50%;
    left: 50%;
    width: ${(props) => {
      switch (props.size) {
        case "small":
          return "8px";
        case "large":
          return "12px";
        default:
          return "10px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "8px";
        case "large":
          return "12px";
        default:
          return "10px";
      }
    }};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-in-out;
  }
`;

interface LabelProps {
  size?: RadioSize;
  disabled?: boolean;
  error?: boolean;
  color?: RadioColor;
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

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  disabled = false,
  error = false,
  color = "primary",
  size = "medium",
  onChange,
  value,
  name,
  children,
}) => {
  const theme = useTheme();

  return (
    <RadioWrapper disabled={disabled}>
      <RadioInputWrapper
        variant="default"
        color={color}
        size={size}
        error={error}
        theme={theme}
      >
        <input
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          value={value}
          name={name}
        />
        <RadioSpan
          variant="default"
          color={color}
          size={size}
          error={error}
          theme={theme}
        />
      </RadioInputWrapper>
      <Label
        size={size}
        disabled={disabled}
        error={error}
        color={color}
        theme={theme}
      >
        {children}
      </Label>
    </RadioWrapper>
  );
};
