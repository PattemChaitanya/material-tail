import React from "react";
import { useTheme } from "../../theme";
import styled from "../../utils/styled";
import { StyledProps } from "../types";

export type AvatarVariant = "circular" | "rounded" | "square";
export type AvatarColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type AvatarSize = "small" | "medium" | "large";

export interface AvatarProps {
  variant?: AvatarVariant;
  color?: AvatarColor;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AvatarStyledProps extends StyledProps {
  $variant: AvatarVariant;
  $size: AvatarSize;
  $color?: AvatarColor;
}

const AvatarWrapper = styled.div<AvatarStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ $size }) =>
    $size === "small" ? "32px" : $size === "large" ? "56px" : "40px"};
  height: ${({ $size }) =>
    $size === "small" ? "32px" : $size === "large" ? "56px" : "40px"};
  border-radius: ${({ $variant }) =>
    $variant === "circular" ? "50%" : $variant === "rounded" ? "4px" : "0"};
  overflow: hidden;
  background: ${({ $color, theme }) => theme.palette[$color || "primary"].main};
  color: ${({ $color, theme }) =>
    theme.palette[$color || "primary"].contrastText};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ $size }) =>
    $size === "small" ? "0.75rem" : $size === "large" ? "1.25rem" : "1rem"};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
`;

const AvatarImage = styled.img<{ $size?: AvatarSize }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarIcon = styled.span<{ $size?: AvatarSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "large" ? "28px" : "20px"};
`;

const AvatarFallback = styled.div<{ $size?: AvatarSize }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
`;

export const Avatar: React.FC<AvatarProps> = ({
  variant = "circular",
  color = "default",
  size = "medium",
  src,
  alt,
  children,
  icon,
  fallback,
}) => {
  const theme = useTheme();
  const [imgError, setImgError] = React.useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const content = React.useMemo(() => {
    if (icon) return <AvatarIcon $size={size}>{icon}</AvatarIcon>;
    if (typeof children === "string") {
      return children
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return children;
  }, [icon, children, size]);

  return (
    <AvatarWrapper theme={theme} $variant={variant} $color={color} $size={size}>
      {src && !imgError && (
        <AvatarImage
          src={src}
          alt={alt}
          $size={size}
          onError={handleImageError}
        />
      )}
      {((src && imgError) || !src) && (
        <>
          {content}
          {fallback && <AvatarFallback $size={size}>{fallback}</AvatarFallback>}
        </>
      )}
    </AvatarWrapper>
  );
};
