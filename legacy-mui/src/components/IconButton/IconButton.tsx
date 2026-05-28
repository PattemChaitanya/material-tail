import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type IconButtonSize = "small" | "medium" | "large";
export type IconButtonColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  size?: IconButtonSize;
  color?: IconButtonColor;
  disabled?: boolean;
  children: React.ReactNode;
}

interface IconButtonWrapperProps {
  size?: IconButtonSize;
  color?: IconButtonColor;
  disabled?: boolean;
  theme: Theme;
}

const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "4px";
      case "large":
        return "12px";
      default:
        return "8px";
    }
  }};
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.theme.palette[props.color || "primary"].main};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].light};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${(props) => props.theme.palette[props.color || "primary"].main}40;
  }
`;

export const IconButton: React.FC<IconButtonProps> = ({
  size = "medium",
  color = "primary",
  disabled = false,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <IconButtonWrapper
      size={size}
      color={color}
      disabled={disabled}
      theme={theme}
      type="button"
      {...props}
    >
      {children}
    </IconButtonWrapper>
  );
};
