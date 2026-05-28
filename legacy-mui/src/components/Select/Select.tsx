import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type SelectColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type SelectSize = "small" | "medium" | "large";
export type SelectVariant = "outlined" | "filled" | "standard";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  color?: SelectColor;
  size?: SelectSize;
  variant?: SelectVariant;
}

interface SelectWrapperProps {
  fullWidth?: boolean;
  theme: Theme;
}

const StyledSelectWrapper = styled.div<SelectWrapperProps>`
  display: inline-flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
`;

interface SelectContainerProps {
  variant?: SelectVariant;
  color?: SelectColor;
  size: SelectSize;
  error?: boolean;
  disabled?: boolean;
  theme: Theme;
}

const StyledSelectContainer = styled.div<SelectContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 120px;
  height: ${(props) => {
    const size = props.size || "medium";
    return size === "small" ? "32px" : size === "large" ? "56px" : "40px";
  }};
  padding: ${(props) => props.theme.spacing.getSpacing(1)}px;
  background-color: ${(props) =>
    props.variant === "filled"
      ? props.theme.palette.action.hover
      : props.theme.palette.background.paper};
  border: ${(props) =>
    props.variant === "outlined"
      ? `1px solid ${
          props.error
            ? props.theme.palette.error.main
            : props.theme.palette.divider
        }`
      : "none"};
  border-bottom: ${(props) =>
    props.variant === "standard"
      ? `1px solid ${
          props.error
            ? props.theme.palette.error.main
            : props.theme.palette.divider
        }`
      : undefined};
  border-radius: ${(props) =>
    props.variant === "outlined" ? props.theme.shape.borderRadius : 0}px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.variant === "filled"
        ? props.theme.palette.action.hover
        : props.theme.palette.background.paper};
    border-color: ${(props) =>
      props.variant !== "filled" && !props.error
        ? props.theme.palette[props.color || "primary"].main
        : undefined};
  }

  &:focus-within {
    border-color: ${(props) =>
      props.variant !== "filled" && !props.error
        ? props.theme.palette[props.color || "primary"].main
        : undefined};
    box-shadow: ${(props) =>
      props.variant !== "filled" && !props.error
        ? `0 0 0 2px ${props.theme.palette[props.color || "primary"].light}`
        : undefined};
  }
`;

interface SelectElementWrapperProps {
  variant?: SelectVariant;
  color?: SelectColor;
  size: SelectSize;
  error?: boolean;
  theme: Theme;
}

const SelectElementWrapper = styled.div<SelectElementWrapperProps>`
  position: relative;
  width: 100%;

  select {
    width: 100%;
    padding: ${({ size }) => {
      switch (size) {
        case "small":
          return "4px 8px";
        case "large":
          return "12px 16px";
        default:
          return "8px 12px";
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case "small":
          return "0.875rem";
        case "large":
          return "1.25rem";
        default:
          return "1rem";
      }
    }};
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.error.main : theme.palette.divider};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.primary};
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ error, color = "primary", theme }) =>
        error ? theme.palette.error.main : theme.palette[color].main};
      box-shadow: 0 0 0 2px
        ${({ error, color = "primary", theme }) =>
          error
            ? theme.palette.error.main + "40"
            : theme.palette[color].main + "40"};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.palette.background.default};
      color: ${({ theme }) => theme.palette.text.disabled};
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      border-color: ${({ error, color = "primary", theme }) =>
        error ? theme.palette.error.main : theme.palette[color].main};
    }
  }
`;

interface LabelProps {
  variant?: SelectVariant;
  color?: SelectColor;
  size: SelectSize;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  theme: Theme;
}

const StyledLabel = styled.label<LabelProps>`
  margin-bottom: ${(props) => props.theme.spacing.getSpacing(0.5)}px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => {
    const size = props.size || "medium";
    return size === "small"
      ? "0.75rem"
      : size === "large"
      ? "1rem"
      : "0.875rem";
  }};
  color: ${(props) =>
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette.text.secondary};

  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
    margin-left: ${(props) => props.theme.spacing.getSpacing(0.5)}px;
    color: ${(props) => props.theme.palette.error.main};
  }
`;

interface HelperTextProps {
  error?: boolean;
  theme: Theme;
}

const StyledHelperText = styled.div<HelperTextProps>`
  margin-top: ${(props) => props.theme.spacing.getSpacing(0.5)}px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${(props) =>
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette.text.secondary};
`;

interface IconWrapperProps {
  position: "start" | "end";
  theme: Theme;
}

const StyledIconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-${(props) => props.position}: ${(props) =>
  props.theme.spacing.getSpacing(1)}px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled = false,
  error = false,
  fullWidth = false,
  helperText,
  label,
  required = false,
  color = "primary",
  size = "medium",
  variant = "outlined",
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  return (
    <StyledSelectWrapper fullWidth={fullWidth} theme={theme}>
      {label && (
        <StyledLabel
          variant={variant}
          color={color}
          size={size}
          error={error}
          disabled={disabled}
          required={required}
          theme={theme}
        >
          {label}
        </StyledLabel>
      )}
      <StyledSelectContainer
        variant={variant}
        color={color}
        size={size}
        error={error}
        disabled={disabled}
        theme={theme}
      >
        <SelectElementWrapper
          variant={variant}
          color={color}
          size={size}
          error={error}
          theme={theme}
        >
          <select
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
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
          </select>
        </SelectElementWrapper>
        <StyledIconWrapper position="end" theme={theme}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StyledIconWrapper>
      </StyledSelectContainer>
      {helperText && (
        <StyledHelperText error={error} theme={theme}>
          {helperText}
        </StyledHelperText>
      )}
    </StyledSelectWrapper>
  );
};
