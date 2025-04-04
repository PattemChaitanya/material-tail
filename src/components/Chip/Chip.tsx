import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { Theme } from "../../theme/types";

export type ChipVariant = "filled" | "outlined" | "text";
export type ChipColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type ChipSize = "small" | "medium" | "large";

export interface ChipProps {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  disabled?: boolean;
  clickable?: boolean;
  deletable?: boolean;
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  avatar?: React.ReactNode;
}

interface ChipWrapperProps {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  disabled?: boolean;
  clickable?: boolean;
  theme: Theme;
}

const ChipWrapper = styled.div<ChipWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) =>
    props.size === "small" ? "24px" : props.size === "large" ? "40px" : "32px"};
  padding: ${(props) => {
    const basePadding =
      props.size === "small"
        ? "0 8px"
        : props.size === "large"
        ? "0 16px"
        : "0 12px";
    return basePadding;
  }};
  font-size: ${(props) =>
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "1rem"
      : "0.875rem"};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  border-radius: ${(props) => props.theme.shape.borderRadius * 2}px;
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : props.clickable ? "pointer" : "default"};
  user-select: none;
  transition: all 0.2s ease-in-out;
  background: ${(props) => {
    if (props.disabled) return props.theme.palette.action.disabledBackground;
    if (props.variant === "outlined") return "transparent";
    if (props.variant === "text") return "transparent";
    return props.theme.palette[props.color || "default"].main;
  }};
  color: ${(props) => {
    if (props.disabled) return props.theme.palette.action.disabled;
    if (props.variant === "outlined")
      return props.theme.palette[props.color || "default"].main;
    if (props.variant === "text")
      return props.theme.palette[props.color || "default"].main;
    return props.theme.palette[props.color || "default"].contrastText;
  }};
  border: ${(props) => {
    if (props.disabled)
      return `1px solid ${props.theme.palette.action.disabled}`;
    if (props.variant === "outlined")
      return `1px solid ${props.theme.palette[props.color || "default"].main}`;
    return "none";
  }};
  box-shadow: ${(props) =>
    props.variant === "filled" ? props.theme.shadows[1] : "none"};

  &:hover {
    background: ${(props) => {
      if (props.disabled) return props.theme.palette.action.disabledBackground;
      if (props.variant === "outlined")
        return `${props.theme.palette[props.color || "default"].main}15`;
      if (props.variant === "text")
        return `${props.theme.palette[props.color || "default"].main}15`;
      return props.theme.palette[props.color || "default"].dark;
    }};
    box-shadow: ${(props) =>
      props.variant === "filled" ? props.theme.shadows[2] : "none"};
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) => props.theme.shadows[4]};
  }
`;

interface ChipLabelProps {
  size?: ChipSize | undefined;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  avatar?: React.ReactNode;
}

const ChipLabel = styled.span<ChipLabelProps>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: ${(props) => {
    if (props.startIcon) return "0 4px 0 0";
    if (props.endIcon) return "0 0 0 4px";
    if (props.avatar) return "0 4px 0 0";
    return "0";
  }};
`;

interface ChipIconProps {
  position: "start" | "end";
  size?: ChipSize;
}

const ChipIcon = styled.span<ChipIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  height: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  font-size: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  margin: ${(props) =>
    props.position === "start" ? "0 4px 0 0" : "0 0 0 4px"};
`;

interface ChipAvatarProps {
  size?: ChipSize;
}

const ChipAvatar = styled.span<ChipAvatarProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.size === "small" ? "20px" : props.size === "large" ? "32px" : "24px"};
  height: ${(props) =>
    props.size === "small" ? "20px" : props.size === "large" ? "32px" : "24px"};
  margin-right: 4px;
  border-radius: 50%;
  overflow: hidden;
`;

interface DeleteIconProps {
  size?: ChipSize;
  disabled?: boolean;
  theme: Theme;
}

const DeleteIcon = styled.span<DeleteIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  height: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  font-size: ${(props) =>
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"};
  margin-left: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) =>
    props.disabled ? props.theme.palette.action.disabled : "inherit"};
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const Chip: React.FC<ChipProps> = ({
  variant = "filled",
  color = "default",
  size = "medium",
  disabled = false,
  clickable = false,
  deletable = false,
  label,
  onClick,
  onDelete,
  startIcon,
  endIcon,
  avatar,
}) => {
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.();
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onDelete?.();
  };

  return (
    <ChipWrapper
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      clickable={clickable}
      theme={theme}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
          clickable &&
          !disabled &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      {avatar && <ChipAvatar size={size}>{avatar}</ChipAvatar>}
      {startIcon && (
        <ChipIcon position="start" size={size}>
          {startIcon}
        </ChipIcon>
      )}
      <ChipLabel
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        avatar={avatar}
      >
        {label}
      </ChipLabel>
      {endIcon && (
        <ChipIcon position="end" size={size}>
          {endIcon}
        </ChipIcon>
      )}
      {deletable && (
        <DeleteIcon
          size={size}
          disabled={disabled}
          theme={theme}
          onClick={handleDelete}
          role="button"
          tabIndex={0}
          onKeyDown={(event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (!disabled && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              onDelete?.();
            }
          }}
        >
          ×
        </DeleteIcon>
      )}
    </ChipWrapper>
  );
};
