import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type SnackbarVariant = "standard" | "outlined";
export type SnackbarColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type SnackbarPosition =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface SnackbarProps {
  variant?: SnackbarVariant;
  color?: SnackbarColor;
  position?: SnackbarPosition;
  open: boolean;
  onClose?: () => void;
  message: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

interface SnackbarWrapperProps {
  variant?: SnackbarVariant;
  color?: SnackbarColor;
  position?: SnackbarPosition;
  theme: Theme;
}

interface SnackbarMessageProps {
  theme: Theme;
}

interface SnackbarActionProps {
  theme: Theme;
}

interface CloseButtonProps {
  theme: Theme;
  size?: "small" | "medium" | "large";
}

const SnackbarWrapper = styled.div<SnackbarWrapperProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background: ${(props) =>
    props.variant === "outlined"
      ? props.theme.palette.background.paper
      : props.theme.palette[props.color || "primary"].main};
  color: ${(props) =>
    props.variant === "outlined"
      ? props.theme.palette[props.color || "primary"].main
      : props.theme.palette[props.color || "primary"].contrastText};
  border: ${(props) =>
    props.variant === "outlined"
      ? `1px solid ${props.theme.palette[props.color || "primary"].main}`
      : "none"};
  box-shadow: ${(props) => props.theme.shadows[3]};
  z-index: 1400;
  min-width: 288px;
  max-width: 568px;
  transform: translateY(100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;

  &.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  ${(props) => {
    switch (props.position) {
      case "top":
        return `
          top: ${props.theme.spacing.getSpacing(2)}px;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);
          &.open {
            transform: translateX(-50%) translateY(0);
          }
        `;
      case "bottom":
        return `
          bottom: ${props.theme.spacing.getSpacing(2)}px;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          &.open {
            transform: translateX(-50%) translateY(0);
          }
        `;
      case "top-left":
        return `
          top: ${props.theme.spacing.getSpacing(2)}px;
          left: ${props.theme.spacing.getSpacing(2)}px;
          transform: translateX(-100%);
          &.open {
            transform: translateX(0);
          }
        `;
      case "top-right":
        return `
          top: ${props.theme.spacing.getSpacing(2)}px;
          right: ${props.theme.spacing.getSpacing(2)}px;
          transform: translateX(100%);
          &.open {
            transform: translateX(0);
          }
        `;
      case "bottom-left":
        return `
          bottom: ${props.theme.spacing.getSpacing(2)}px;
          left: ${props.theme.spacing.getSpacing(2)}px;
          transform: translateX(-100%);
          &.open {
            transform: translateX(0);
          }
        `;
      case "bottom-right":
        return `
          bottom: ${props.theme.spacing.getSpacing(2)}px;
          right: ${props.theme.spacing.getSpacing(2)}px;
          transform: translateX(100%);
          &.open {
            transform: translateX(0);
          }
        `;
      default:
        return "";
    }
  }}
`;

const SnackbarMessage = styled.div<SnackbarMessageProps>`
  padding: 8px 0;
  margin-right: 8px;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  flex: 1;
`;

const SnackbarAction = styled.div<SnackbarActionProps>`
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid ${(props) => props.theme.palette.divider};
`;

const CloseButton = styled.button<CloseButtonProps>`
  padding: ${(props) =>
    props.size === "small" ? "4px" : props.size === "large" ? "8px" : "6px"};
  margin-left: 8px;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Snackbar: React.FC<SnackbarProps> = ({
  variant = "standard",
  color = "default",
  position = "bottom",
  open,
  onClose,
  message,
  action,
  autoHideDuration = 6000,
  anchorOrigin,
}) => {
  const theme = useTheme();
  const timerRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    if (open && autoHideDuration > 0 && onClose) {
      timerRef.current = setTimeout(onClose, autoHideDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [open, autoHideDuration, onClose]);

  return (
    <SnackbarWrapper
      variant={variant}
      color={color}
      position={position}
      theme={theme}
      className={open ? "open" : ""}
      role="alert"
      aria-live="polite"
    >
      <SnackbarMessage theme={theme}>{message}</SnackbarMessage>
      {action && <SnackbarAction theme={theme}>{action}</SnackbarAction>}
      {onClose && (
        <CloseButton
          onClick={onClose}
          aria-label="close"
          size="small"
          theme={theme}
        >
          ×
        </CloseButton>
      )}
    </SnackbarWrapper>
  );
};
