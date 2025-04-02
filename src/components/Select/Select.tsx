import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";

export type SelectVariant = "outlined" | "filled" | "standard";
export type SelectColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type SelectSize = "small" | "medium" | "large";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  variant?: SelectVariant;
  color?: SelectColor;
  size?: SelectSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: SelectOption[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
}

interface SelectWrapperProps {
  fullWidth?: boolean;
}

interface LabelProps {
  variant?: SelectVariant;
  size?: SelectSize;
  error?: boolean;
  color?: SelectColor;
  disabled?: boolean;
  theme: Theme;
}

interface SelectContainerProps {
  variant?: SelectVariant;
  color?: SelectColor;
  size?: SelectSize;
  error?: boolean;
  disabled?: boolean;
  theme: Theme;
}

interface Theme {
  palette: {
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    background: {
      default: string;
      paper: string;
    };
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
    };
    divider: string;
  };
  typography: {
    fontFamily: string;
  };
  shape: {
    borderRadius: number;
  };
  spacing: (factor: number) => string;
}

interface StyledSelectProps {
  variant?: SelectVariant;
  size?: SelectSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
  value?: string | string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  theme: Theme;
}

interface HelperTextProps {
  error?: boolean;
  color?: SelectColor;
  theme: Theme;
}

interface IconWrapperProps {
  position: "start" | "end";
  theme: Theme;
}

const SelectWrapper = styled<"div", SelectWrapperProps>(
  "div",
  ({ fullWidth }) => `
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: ${fullWidth ? "100%" : "auto"};
    min-width: 200px;
  `
);

const Label = styled<"label", LabelProps>(
  "label",
  ({ variant, size, error, color = "primary", theme }) => `
    position: absolute;
    left: ${variant === "outlined" ? "14px" : "0"};
    top: ${
      variant === "outlined"
        ? "-9px"
        : size === "small"
        ? "4px"
        : size === "large"
        ? "8px"
        : "6px"
    };
    background: ${
      variant === "outlined" ? theme.palette.background.paper : "transparent"
    };
    padding: ${variant === "outlined" ? "0 4px" : "0"};
    color: ${error ? theme.palette.error.main : theme.palette[color].main};
    font-size: ${
      size === "small" ? "0.75rem" : size === "large" ? "1rem" : "0.875rem"
    };
    font-weight: ${theme.typography.fontWeightMedium};
    pointer-events: none;
    transition: all 0.2s ease-in-out;
  `
);

const SelectContainer = styled<"div", SelectContainerProps>(
  "div",
  ({ variant, error, color = "primary", theme }) => `
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;

    ${
      variant === "outlined"
        ? `
          border: 1px solid ${
            error ? theme.palette.error.main : theme.palette[color].main
          };
          border-radius: ${theme.shape.borderRadius}px;
          &:hover {
            border-color: ${
              error ? theme.palette.error.dark : theme.palette[color].dark
            };
          }
          &:focus-within {
            border-color: ${
              error ? theme.palette.error.main : theme.palette[color].main
            };
            border-width: 2px;
          }
        `
        : variant === "filled"
        ? `
          border-bottom: 1px solid ${
            error ? theme.palette.error.main : theme.palette[color].main
          };
          border-radius: ${theme.shape.borderRadius}px ${
            theme.shape.borderRadius
          }px 0 0;
          background: ${
            error
              ? theme.palette.error.light + "15"
              : theme.palette[color].light + "15"
          };
          &:hover {
            background: ${
              error
                ? theme.palette.error.light + "25"
                : theme.palette[color].light + "25"
            };
          }
          &:focus-within {
            border-bottom-width: 2px;
          }
        `
        : `
          border-bottom: 1px solid ${
            error ? theme.palette.error.main : theme.palette[color].main
          };
          &:hover {
            border-bottom-color: ${
              error ? theme.palette.error.dark : theme.palette[color].dark
            };
          }
          &:focus-within {
            border-bottom-width: 2px;
          }
        `
    }
  `
);

const StyledSelect = styled<"select", StyledSelectProps>(
  "select",
  ({ variant, size = "medium", startIcon, endIcon, theme }) => `
    width: 100%;
    padding: ${
      variant === "outlined"
        ? `${size === "small" ? "8px" : size === "large" ? "16px" : "12px"} ${
            startIcon || endIcon ? "0" : ""
          }`
        : `${size === "small" ? "8px" : size === "large" ? "16px" : "12px"} ${
            startIcon || endIcon ? "0" : ""
          } ${size === "small" ? "8px" : size === "large" ? "16px" : "12px"}`
    };
    font-family: ${theme.typography.fontFamily};
    font-size: ${
      size === "small" ? "0.875rem" : size === "large" ? "1.25rem" : "1rem"
    };
    line-height: 1.4375em;
    color: ${theme.palette.text.primary};
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    padding-right: 32px;

    &:disabled {
      color: ${theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  `
);

const HelperText = styled<"div", HelperTextProps>(
  "div",
  ({ error, color = "primary", theme }) => `
    margin-top: 3px;
    font-size: 0.75rem;
    color: ${error ? theme.palette.error.main : theme.palette[color].main};
    min-height: 1em;
  `
);

const IconWrapper = styled<"div", IconWrapperProps>(
  "div",
  ({ position, theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${position === "start" ? "0 8px 0 12px" : "0 12px 0 8px"};
    color: ${theme.palette.text.secondary};
  `
);

export const Select: React.FC<SelectProps> = ({
  variant = "outlined",
  color = "primary",
  size = "medium",
  label,
  error,
  helperText,
  required,
  disabled,
  multiple,
  value,
  onChange,
  options,
  startIcon,
  endIcon,
  placeholder,
}) => {
  const theme = useTheme();
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = multiple
      ? Array.from(event.target.selectedOptions, (option) => option.value)
      : event.target.value;
    onChange?.(newValue);
  };

  return (
    <SelectWrapper>
      {label && (
        <Label
          variant={variant}
          size={size}
          error={error}
          color={color}
          disabled={disabled}
          theme={theme}
        >
          {label}
          {required && " *"}
        </Label>
      )}
      <SelectContainer
        variant={variant}
        color={color}
        size={size}
        error={error}
        disabled={disabled}
        theme={theme}
      >
        {startIcon && (
          <IconWrapper position="start" theme={theme}>
            {startIcon}
          </IconWrapper>
        )}
        <StyledSelect
          ref={selectRef}
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
          multiple={multiple}
          value={value}
          onChange={handleChange}
          theme={theme}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {endIcon && (
          <IconWrapper position="end" theme={theme}>
            {endIcon}
          </IconWrapper>
        )}
      </SelectContainer>
      {helperText && (
        <HelperText error={error} color={color} theme={theme}>
          {helperText}
        </HelperText>
      )}
    </SelectWrapper>
  );
};
