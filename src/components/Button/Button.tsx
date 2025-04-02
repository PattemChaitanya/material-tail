import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";
import { Theme } from "../../theme/types";

export type ButtonVariant = "text" | "outlined" | "contained" | "elevated";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface StyledButtonProps extends ButtonProps {
  theme: Theme;
}

const StyledButton = styled<"button", StyledButtonProps>(
  "button",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: ${props.theme.shape.borderRadius}px;
  font-family: ${props.theme.typography.fontFamily};
  font-size: ${props.theme.typography.body1.fontSize};
  font-weight: ${props.theme.typography.fontWeightMedium};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  width: ${props.fullWidth ? "100%" : "auto"};
  gap: ${props.theme.spacing.getSpacing(1)};

  ${(() => {
    switch (props.size) {
      case "small":
        return `
          padding: 4px 10px;
          font-size: 0.8125rem;
        `;
      case "large":
        return `
          padding: 8px 22px;
          font-size: 0.9375rem;
        `;
      default:
        return "";
    }
  })()}

  ${(() => {
    const colorObj = props.theme.palette[props.color || "primary"];
    switch (props.variant) {
      case "text":
        return `
          background: transparent;
          color: ${colorObj.main};
          &:hover {
            background: ${colorObj.main}15;
          }
        `;
      case "outlined":
        return `
          background: transparent;
          border: 1px solid ${colorObj.main};
          color: ${colorObj.main};
          &:hover {
            background: ${colorObj.main}15;
          }
        `;
      case "elevated":
        return `
          background: ${colorObj.main};
          color: ${colorObj.contrastText};
          box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2),
                      0 2px 2px 0 rgba(0,0,0,0.14),
                      0 1px 5px 0 rgba(0,0,0,0.12);
          &:hover {
            box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2),
                       0 3px 14px 2px rgba(0,0,0,0.12);
          }
        `;
      case "contained":
      default:
        return `
          background: ${colorObj.main};
          color: ${colorObj.contrastText};
          &:hover {
            background: ${colorObj.dark};
          }
        `;
    }
  })()}

  &:disabled {
    color: ${props.theme.palette.text.secondary};
    background: ${props.theme.palette.background.paper};
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${
      props.theme.palette[props.color || "primary"].main
    }40;
  }
`
);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledButton
      theme={theme}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="start-icon">{startIcon}</span>}
      {children}
      {endIcon && <span className="end-icon">{endIcon}</span>}
    </StyledButton>
  );
};
