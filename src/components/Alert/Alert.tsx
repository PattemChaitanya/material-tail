import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";
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

interface AlertWrapperProps extends StyledProps, ColorProps {
  variant: AlertVariant;
  severity: "error" | "warning" | "info" | "success";
  size: AlertSize;
}

interface AlertIconProps {
  size?: AlertSize;
  color?: AlertColor;
  theme: any;
}

interface AlertMessageProps {
  size?: AlertSize;
}

interface AlertActionProps {
  size?: AlertSize;
}

interface CloseIconProps {
  size?: AlertSize;
  color?: AlertColor;
  theme: any;
}

const AlertWrapper = styled<"div", AlertWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 4px;
  font-family: ${props.theme.typography.fontFamily};
  font-size: ${
    props.size === "small"
      ? "0.875rem"
      : props.size === "large"
      ? "1rem"
      : "0.875rem"
  };
  font-weight: ${props.theme.typography.fontWeightMedium};
  line-height: ${
    props.size === "small" ? "1.25" : props.size === "large" ? "1.5" : "1.25"
  };
  letter-spacing: 0.01071em;

  ${(() => {
    const color = props.theme.palette[props.severity];
    switch (props.variant) {
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
  })()}
`
);

const AlertIcon = styled<"span", AlertIconProps>(
  "span",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${
    props.size === "small" ? "8px" : props.size === "large" ? "12px" : "10px"
  };
  font-size: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
  color: ${props.theme.palette[props.color || "default"].main};
`
);

const AlertMessage = styled<"div", AlertMessageProps>(
  "div",
  (props) => `
  flex: 1;
  display: flex;
  align-items: center;
  margin: ${props.size === "small" ? "0" : props.size === "large" ? "0" : "0"};
`
);

const AlertAction = styled<"div", AlertActionProps>(
  "div",
  (props) => `
  display: inline-flex;
  align-items: center;
  margin-left: ${
    props.size === "small" ? "8px" : props.size === "large" ? "12px" : "10px"
  };
`
);

const CloseIcon = styled<"span", CloseIconProps>(
  "span",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: ${
    props.size === "small" ? "8px" : props.size === "large" ? "12px" : "10px"
  };
  font-size: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
  color: ${props.theme.palette[props.color || "default"].main};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`
);

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
      variant={variant}
      severity={severity}
      color={color}
      size={size}
      role="alert"
    >
      {icon && (
        <AlertIcon size={size} color={color} theme={theme}>
          {icon}
        </AlertIcon>
      )}
      <AlertMessage size={size}>{children}</AlertMessage>
      {action && <AlertAction size={size}>{action}</AlertAction>}
      {onClose && (
        <CloseIcon
          size={size}
          color={color}
          theme={theme}
          onClick={handleClose}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
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
