import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";

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

interface SwitchInputProps {
  variant?: SwitchVariant;
  color?: SwitchColor;
  size?: SwitchSize | undefined;
  error?: boolean;
  theme: any;
}

interface SwitchSpanProps {
  variant?: SwitchVariant;
  color?: SwitchColor;
  size?: SwitchSize;
  error?: boolean;
  theme: any;
}

interface LabelProps {
  size?: SwitchSize;
  disabled?: boolean;
  error?: boolean;
  color?: SwitchColor;
  theme: any;
}

const SwitchWrapper = styled<"div", SwitchWrapperProps>(
  "div",
  ({ disabled }) => `
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  `
);

const SwitchInput = styled<"input", SwitchInputProps>(
  "input",
  ({ color = "primary", size = "medium", theme }) => `
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + span {
      background-color: ${theme.palette[color].main};
      border-color: ${theme.palette[color].main};
    }

    &:checked + span:before {
      transform: translateX(
        ${(() => {
          switch (size) {
            case "small":
              return "16px";
            case "large":
              return "24px";
            default:
              return "20px";
          }
        })()}
      );
      background-color: ${theme.palette.background.paper};
    }

    &:focus + span {
      box-shadow: 0 0 0 2px ${theme.palette[color].main}40;
    }

    &:disabled + span {
      background-color: ${theme.palette.background.paper};
      border-color: ${theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:disabled:checked + span {
      background-color: ${theme.palette.text.disabled};
    }
  `
);

const SwitchSpan = styled<"span", SwitchSpanProps>(
  "span",
  ({ variant, color = "primary", size, error, theme }) => `
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: 2px solid ${
      error ? theme.palette.error.main : theme.palette[color].main
    };
    border-radius: ${variant === "outlined" ? "4px" : "34px"};
    background-color: ${theme.palette.background.paper};
    transition: all 0.2s ease-in-out;

    ${(() => {
      switch (size) {
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
    })()}

    &:before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: ${(() => {
        switch (size) {
          case "small":
            return "12px";
          case "large":
            return "20px";
          default:
            return "16px";
        }
      })()};
      height: ${(() => {
        switch (size) {
          case "small":
            return "12px";
          case "large":
            return "20px";
          default:
            return "16px";
        }
      })()};
      background-color: ${theme.palette[color].main};
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
    }
  `
);

const Label = styled<"label", LabelProps>(
  "label",
  ({ size, disabled, error, color = "primary", theme }) => `
    margin-left: ${size === "small" ? "8px" : "12px"};
    font-family: ${theme.typography.fontFamily};
    font-size: ${(() => {
      if (size === "small") return "0.875rem";
      if (size === "large") return "1.25rem";
      return "1rem";
    })()};
    color: ${
      disabled
        ? theme.palette.text.disabled
        : error
        ? theme.palette.error.main
        : theme.palette.text.primary
    };
    cursor: ${disabled ? "not-allowed" : "pointer"};
  `
);

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
      <SwitchInput
        type="checkbox"
        role="switch"
        theme={theme}
        variant={variant}
        color={color}
        size={size}
        error={error}
        disabled={disabled}
        {...props}
      />
      <SwitchSpan
        theme={theme}
        variant={variant}
        color={color}
        size={size}
        error={error}
      />
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
