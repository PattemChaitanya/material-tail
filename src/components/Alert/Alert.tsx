import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { StyledProps, ColorProps } from "../types";

export type AlertVariant = "filled" | "outlined" | "text";
export type AlertColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type AlertSize = "small" | "medium" | "large";

export interface AlertProps extends ColorProps {
  variant?: AlertVariant;
  severity?: "error" | "warning" | "info" | "success";
  size?: AlertSize;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface AlertStyledProps extends StyledProps {
  $variant: AlertVariant;
  $severity: "error" | "warning" | "info" | "success";
  $size: AlertSize;
  $color?: AlertColor;
}

const AlertWrapper = styled.div<AlertStyledProps>`
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 4px;
  letter-spacing: 0.01071em;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.875rem" : $size === "large" ? "1rem" : "0.875rem"};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  line-height: ${({ $size }) =>
    $size === "small" ? "1.25" : $size === "large" ? "1.5" : "1.25"};

  ${({ $variant, $severity, theme }) => {
    const color = theme.palette[$severity];
    switch ($variant) {
      case "filled":
        return `
          background: ${color.main};
          color: ${color.contrastText};
        `;
      case "outlined":
        return `
          background: transparent;
          border: 1px solid ${color.main};
          color: ${color.main};
        `;
      case "text":
        return `
          background: transparent;
          color: ${color.main};
        `;
      default:
        return "";
    }
  }}
`;

const AlertIcon = styled.span<AlertStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ $size }) =>
    $size === "small" ? "8px" : $size === "large" ? "12px" : "10px"};
  font-size: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "large" ? "24px" : "20px"};
  color: ${({ $color, theme }) => theme.palette[$color || "default"].main};
`;

const AlertMessage = styled.div<{ $size?: AlertSize }>`
  flex: 1;
  display: flex;
  align-items: center;
  margin: ${({ $size }) =>
    $size === "small" ? "0" : $size === "large" ? "0" : "0"};
`;

const AlertAction = styled.div<{ $size?: AlertSize }>`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ $size }) =>
    $size === "small" ? "8px" : $size === "large" ? "12px" : "10px"};
`;

const CloseIcon = styled.span<AlertStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ $size }) =>
    $size === "small" ? "8px" : $size === "large" ? "12px" : "10px"};
  font-size: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "large" ? "24px" : "20px"};
  color: ${({ $color, theme }) => theme.palette[$color || "default"].main};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const Alert: React.FC<AlertProps> = ({
  variant = "filled",
  severity = "info",
  color = "primary",
  size = "medium",
  icon,
  action,
  onClose,
  children,
}) => {
  const theme = useTheme();

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.();
  };

  return (
    <AlertWrapper
      theme={theme}
      $variant={variant}
      $severity={severity}
      $color={color}
      $size={size}
      role="alert"
    >
      {icon && (
        <AlertIcon
          theme={theme}
          $variant={variant}
          $severity={severity}
          $color={color}
          $size={size}
        >
          {icon}
        </AlertIcon>
      )}
      <AlertMessage $size={size}>{children}</AlertMessage>
      {action && <AlertAction $size={size}>{action}</AlertAction>}
      {onClose && (
        <CloseIcon
          theme={theme}
          $variant={variant}
          $severity={severity}
          $color={color}
          $size={size}
          onClick={handleClose}
          role="button"
          tabIndex={0}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onClose();
            }
          }}
        >
          ×
        </CloseIcon>
      )}
    </AlertWrapper>
  );
};
