import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { Input } from "../Input";

export type TextFieldVariant = "outlined" | "filled" | "standard";
export type TextFieldColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type TextFieldSize = "small" | "medium" | "large";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: TextFieldVariant;
  color?: TextFieldColor;
  size?: TextFieldSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
}

interface StyledProps {
  theme: any;
  $variant?: TextFieldVariant;
  $size?: TextFieldSize;
  $error?: boolean;
  $color?: TextFieldColor;
  $disabled?: boolean;
  $fullWidth?: boolean;
  $position?: "start" | "end";
}

const TextFieldWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-width: 200px;
`;

const Label = styled.label<StyledProps>`
  position: absolute;
  left: ${({ $variant }) => ($variant === "outlined" ? "14px" : "0")};
  top: ${({ $variant, $size }) =>
    $variant === "outlined"
      ? "-9px"
      : $size === "small"
      ? "4px"
      : $size === "large"
      ? "8px"
      : "6px"};
  background: ${({ $variant, theme }) =>
    $variant === "outlined" ? theme.palette.background.paper : "transparent"};
  padding: ${({ $variant }) => ($variant === "outlined" ? "0 4px" : "0")};
  color: ${({ $error, $color, theme }) =>
    $error
      ? theme.palette.error.main
      : theme.palette[$color || "primary"].main};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.75rem" : $size === "large" ? "1rem" : "0.875rem"};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

const InputContainer = styled.div<StyledProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  ${({ $variant, $error, $color, theme }) =>
    $variant === "outlined"
      ? `
        border: 1px solid ${
          $error
            ? theme.palette.error.main
            : theme.palette[$color || "primary"].main
        };
        border-radius: ${theme.shape.borderRadius}px;
        &:hover {
          border-color: ${
            $error
              ? theme.palette.error.dark
              : theme.palette[$color || "primary"].dark
          };
        }
        &:focus-within {
          border-color: ${
            $error
              ? theme.palette.error.main
              : theme.palette[$color || "primary"].main
          };
          border-width: 2px;
        }
      `
      : $variant === "filled"
      ? `
        border-bottom: 1px solid ${
          $error
            ? theme.palette.error.main
            : theme.palette[$color || "primary"].main
        };
        border-radius: ${theme.shape.borderRadius}px ${
          theme.shape.borderRadius
        }px 0 0;
        background: ${
          $error
            ? theme.palette.error.light + "15"
            : theme.palette[$color || "primary"].light + "15"
        };
        &:hover {
          background: ${
            $error
              ? theme.palette.error.light + "25"
              : theme.palette[$color || "primary"].light + "25"
          };
        }
        &:focus-within {
          border-bottom-width: 2px;
        }
      `
      : `
        border-bottom: 1px solid ${
          $error
            ? theme.palette.error.main
            : theme.palette[$color || "primary"].main
        };
        &:hover {
          border-bottom-color: ${
            $error
              ? theme.palette.error.dark
              : theme.palette[$color || "primary"].dark
          };
        }
        &:focus-within {
          border-bottom-width: 2px;
        }
      `}
`;

const HelperText = styled.div<StyledProps>`
  margin-top: 3px;
  font-size: 0.75rem;
  color: ${({ $error, $color, theme }) =>
    $error
      ? theme.palette.error.main
      : theme.palette[$color || "primary"].main};
  min-height: 1em;
`;

const IconWrapper = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $position }) =>
    $position === "start" ? "0 8px 0 12px" : "0 12px 0 8px"};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const TextField: React.FC<TextFieldProps> = ({
  variant = "outlined",
  color = "primary",
  size = "medium",
  label,
  error,
  helperText,
  required,
  disabled,
  startIcon,
  endIcon,
  fullWidth,
  multiline,
  rows,
  maxRows,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextFieldWrapper $fullWidth={fullWidth}>
      {label && (
        <Label
          theme={theme}
          $variant={variant}
          $error={error}
          $color={color}
          $size={size}
          $disabled={disabled}
        >
          {label}
          {required && " *"}
        </Label>
      )}
      <InputContainer
        theme={theme}
        $variant={variant}
        $error={error}
        $color={color}
        $size={size}
        $disabled={disabled}
      >
        {startIcon && (
          <IconWrapper $position="start" theme={theme}>
            {startIcon}
          </IconWrapper>
        )}
        <Input
          theme={theme}
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
          {...props}
        />
        {endIcon && (
          <IconWrapper $position="end" theme={theme}>
            {endIcon}
          </IconWrapper>
        )}
      </InputContainer>
      {helperText && (
        <HelperText theme={theme} $error={error} $color={color}>
          {helperText}
        </HelperText>
      )}
    </TextFieldWrapper>
  );
};
