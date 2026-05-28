import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { StyledProps, ColorProps, Color } from "../types";

export type BadgeVariant = "standard" | "dot";
export type BadgeColor = Exclude<Color, "default">;
export type BadgeSize = "small" | "medium" | "large";
export type BadgePosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface BadgeProps extends ColorProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  position?: BadgePosition;
  max?: number;
  showZero?: boolean;
  children?: React.ReactNode;
  badgeContent?: React.ReactNode;
}

interface BadgeStyledProps extends StyledProps {
  $variant: BadgeVariant;
  $size: BadgeSize;
  $color: BadgeColor;
}

const BadgeWrapper = styled.div<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "large" ? "24px" : "20px"};
  height: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "large" ? "24px" : "20px"};
  padding: 0 6px;
  border-radius: 10px;
  background: ${({ $color, theme }) => theme.palette[$color].main};
  color: ${({ $color, theme }) => theme.palette[$color].contrastText};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.75rem" : $size === "large" ? "0.875rem" : "0.75rem"};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.2s ease-in-out;

  ${({ $variant, $size }) =>
    $variant === "dot"
      ? `
    padding: 0;
    min-width: ${
      $size === "small" ? "8px" : $size === "large" ? "12px" : "10px"
    };
    height: ${$size === "small" ? "8px" : $size === "large" ? "12px" : "10px"};
    border-radius: 50%;
    `
      : ""}
`;

interface BadgeContentStyledProps extends StyledProps {
  $variant: BadgeVariant;
  $color: BadgeColor;
  $size: BadgeSize;
  $position: BadgePosition;
}

const BadgeContent = styled.span<BadgeContentStyledProps>`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ $variant, $size }) =>
    $variant === "dot"
      ? $size === "small"
        ? "6px"
        : $size === "large"
        ? "10px"
        : "8px"
      : "auto"};
  height: ${({ $variant, $size }) =>
    $variant === "dot"
      ? $size === "small"
        ? "6px"
        : $size === "large"
        ? "10px"
        : "8px"
      : $size === "small"
      ? "16px"
      : $size === "large"
      ? "24px"
      : "20px"};
  padding: ${({ $variant, $size }) =>
    $variant === "dot"
      ? "0"
      : $size === "small"
      ? "0 4px"
      : $size === "large"
      ? "0 8px"
      : "0 6px"};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.75rem" : $size === "large" ? "1rem" : "0.875rem"};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  border-radius: ${({ $variant, $size }) =>
    $variant === "dot"
      ? "50%"
      : $size === "small"
      ? "8px"
      : $size === "large"
      ? "12px"
      : "10px"};
  background: ${({ $color, theme }) => theme.palette[$color].main};
  color: ${({ $color, theme }) => theme.palette[$color].contrastText};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  z-index: 1;
  transform: ${({ $position }) => {
    switch ($position) {
      case "top-right":
        return "translate(50%, -50%)";
      case "top-left":
        return "translate(-50%, -50%)";
      case "bottom-right":
        return "translate(50%, 50%)";
      case "bottom-left":
        return "translate(-50%, 50%)";
      default:
        return "translate(50%, -50%)";
    }
  }};
  top: ${({ $position }) =>
    $position?.includes("top")
      ? "0"
      : $position?.includes("bottom")
      ? "100%"
      : "0"};
  right: ${({ $position }) =>
    $position?.includes("right")
      ? "0"
      : $position?.includes("left")
      ? "100%"
      : "0"};
`;

export const Badge: React.FC<BadgeProps> = ({
  variant = "standard",
  color = "primary",
  size = "medium",
  position = "top-right",
  max = 99,
  showZero = false,
  children,
  badgeContent,
}) => {
  const theme = useTheme();
  const badgeColor = color === "default" ? "primary" : color;

  const content = React.useMemo(() => {
    if (variant === "dot") return null;
    if (badgeContent !== undefined) return badgeContent;
    if (typeof badgeContent === "number") {
      if (badgeContent === 0 && !showZero) return null;
      return badgeContent > max ? `${max}+` : badgeContent;
    }
    return null;
  }, [variant, badgeContent, max, showZero]);

  return (
    <BadgeWrapper
      theme={theme}
      $variant={variant}
      $color={badgeColor}
      $size={size}
    >
      {variant === "standard" && children}
      {content !== null && (
        <BadgeContent
          theme={theme}
          $variant={variant}
          $color={badgeColor}
          $size={size}
          $position={position}
          role="status"
          aria-label={
            typeof content === "number"
              ? `${content} notifications`
              : "notification"
          }
        >
          {content}
        </BadgeContent>
      )}
    </BadgeWrapper>
  );
};
