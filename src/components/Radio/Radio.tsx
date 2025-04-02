import React from "react";
import { useTheme } from "../../theme";
import { Theme as ThemeType } from "../../theme/types";
import { styled } from "../../utils/styled";

export type RadioVariant = "default" | "outlined";
export type RadioColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type RadioSize = "small" | "medium" | "large";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: RadioVariant;
  color?: RadioColor;
  size?: RadioSize;
  label?: string;
  error?: boolean;
  required?: boolean;
}

type Theme = ThemeType & {
  palette: {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      paper: string;
    };
    error: {
      main: string;
    };
    action: {
      disabled: string;
    };
  };
};

interface RadioWrapperProps {
  disabled?: boolean;
}

interface RadioInputProps {
  variant?: RadioVariant;
  color?: RadioColor;
  size?: RadioSize;
  error?: boolean;
  theme: Theme;
}

interface RadioSpanProps {
  variant?: RadioVariant;
  color?: RadioColor;
  size?: RadioSize;
  error?: boolean;
  theme: Theme;
}

interface LabelProps {
  size?: RadioSize;
  disabled?: boolean;
  error?: boolean;
  color?: RadioColor;
  theme: Theme;
}

const RadioWrapper = styled<"div", RadioWrapperProps>(
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

const RadioInput = styled<"input", RadioInputProps>(
  "input",
  ({ color = "primary", theme }) => `
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + span {
      border-color: ${theme.palette[color].main};
    }

    &:checked + span:after {
      display: block;
      background-color: ${theme.palette[color].main};
    }

    &:focus + span {
      box-shadow: 0 0 0 2px ${theme.palette[color].main}40;
    }

    &:disabled + span {
      border-color: ${theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:disabled:checked + span:after {
      background-color: ${theme.palette.text.disabled};
    }
  `
);

const RadioSpan = styled<"span", RadioSpanProps>(
  "span",
  ({ error, color = "primary", size = "medium", theme }) => `
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: 2px solid ${
      error ? theme.palette.error.main : theme.palette[color].main
    };
    border-radius: 50%;
    background-color: ${theme.palette.background.paper};
    transition: all 0.2s ease-in-out;

    ${(() => {
      switch (size) {
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
    })()}

    &:after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      width: ${(() => {
        switch (size) {
          case "small":
            return "8px";
          case "large":
            return "12px";
          default:
            return "10px";
        }
      })()};
      height: ${(() => {
        switch (size) {
          case "small":
            return "8px";
          case "large":
            return "12px";
          default:
            return "10px";
        }
      })()};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease-in-out;
    }
  `
);

const Label = styled<"label", LabelProps>(
  "label",
  ({ size = "medium", disabled, error, color = "primary", theme }) => `
    margin-left: ${size === "small" ? "8px" : "12px"};
    font-family: ${theme.typography.fontFamily};
    font-size: ${
      size === "small" ? "0.875rem" : size === "large" ? "1.25rem" : "1rem"
    };
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

export const Radio: React.FC<RadioProps> = ({
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
    <RadioWrapper disabled={disabled}>
      <RadioInput
        type="radio"
        theme={theme}
        variant={variant}
        color={color}
        size={size}
        error={error}
        disabled={disabled}
        {...props}
      />
      <RadioSpan
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
    </RadioWrapper>
  );
};
