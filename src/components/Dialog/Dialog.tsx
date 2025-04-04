import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { Theme } from "../../theme/types";
import { IconButton } from "../IconButton/IconButton";

export type DialogVariant = "standard" | "fullscreen";
export type DialogSize = "small" | "medium" | "large" | "fullscreen";
export type DialogColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface DialogProps {
  variant?: DialogVariant;
  size?: DialogSize;
  color?: DialogColor;
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  maxWidth?: boolean;
  fullWidth?: boolean;
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

interface DialogWrapperProps {
  variant?: DialogVariant;
  size?: DialogSize;
  maxWidth?: boolean;
  fullWidth?: boolean;
  theme: Theme;
}

const DialogWrapper = styled.div<DialogWrapperProps>`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme, variant }) =>
    variant === "fullscreen" ? "0" : `${theme.shape.borderRadius}px`};
  box-shadow: ${({ theme }) => theme.shadows[24]};
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 64px);
  width: ${({ size, fullWidth }) => {
    if (size === "fullscreen") return "100%";
    if (fullWidth) return "100%";
    switch (size) {
      case "small":
        return "300px";
      case "large":
        return "800px";
      default:
        return "500px";
    }
  }};
  margin: ${({ size, fullWidth }) => {
    if (size === "fullscreen") return "0";
    if (fullWidth) return "32px";
    return "32px auto";
  }};
  position: relative;
  transform: scale(0.95);
  transition: all 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;

  &.open {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
`;

interface DialogHeaderProps {
  color?: DialogColor;
  theme: Theme;
}

const DialogHeader = styled.div<DialogHeaderProps>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  color: ${({ color = "default", theme }) => theme.palette[color].main};
`;

interface DialogTitleProps {
  theme: Theme;
}

const DialogTitle = styled.h2<DialogTitleProps>`
  margin: 0;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  flex: 1;
`;

const DialogContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  color: ${({ theme }: { theme: Theme }) => theme.palette.text.primary};
`;

const DialogActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 24px;
  border-top: 1px solid
    ${({ theme }: { theme: Theme }) => theme.palette.divider};
  gap: 8px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const Dialog: React.FC<DialogProps> = ({
  variant = "standard",
  size = "medium",
  color = "default",
  open,
  onClose,
  title,
  children,
  actions,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  maxWidth = false,
  fullWidth = false,
}) => {
  const theme = useTheme();
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [open, closeOnEsc, onClose]);

  React.useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (
      event.target === event.currentTarget &&
      closeOnBackdropClick &&
      onClose
    ) {
      onClose();
    }
  };

  return (
    <Backdrop
      className={open ? "open" : ""}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <DialogWrapper
        ref={dialogRef}
        variant={variant}
        size={size}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        theme={theme}
        className={open ? "open" : ""}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
      >
        {title && (
          <DialogHeader color={color} theme={theme}>
            <DialogTitle id="dialog-title" theme={theme}>
              {title}
            </DialogTitle>
            {onClose && (
              <CloseButton onClick={onClose} aria-label="close" size="small">
                ×
              </CloseButton>
            )}
          </DialogHeader>
        )}
        <DialogContent theme={theme}>{children}</DialogContent>
        {actions && <DialogActions theme={theme}>{actions}</DialogActions>}
      </DialogWrapper>
    </Backdrop>
  );
};
