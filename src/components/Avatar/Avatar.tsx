import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";
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

interface AvatarWrapperProps extends StyledProps {
  variant: AvatarVariant;
  size: "small" | "medium" | "large";
}

const AvatarWrapper = styled<"div", AvatarWrapperProps>(
  "div",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${
    props.size === "small" ? "32px" : props.size === "large" ? "56px" : "40px"
  };
  height: ${
    props.size === "small" ? "32px" : props.size === "large" ? "56px" : "40px"
  };
  border-radius: ${
    props.variant === "circular"
      ? "50%"
      : props.variant === "rounded"
      ? "4px"
      : "0"
  };
  overflow: hidden;
  background: ${props.theme.palette.primary.main};
  color: ${props.theme.palette.primary.contrastText};
  font-family: ${props.theme.typography.fontFamily};
  font-size: ${
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "1.25rem"
      : "1rem"
  };
  font-weight: ${props.theme.typography.fontWeightMedium};
`
);

interface AvatarImageProps {
  size?: AvatarSize;
}

const AvatarImage = styled<"img", AvatarImageProps>(
  "img",
  (props) => `
  width: 100%;
  height: 100%;
  object-fit: cover;
`
);

interface AvatarIconProps {
  size?: AvatarSize;
}

const AvatarIcon = styled<"span", AvatarIconProps>(
  "span",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${
    props.size === "small" ? "16px" : props.size === "large" ? "28px" : "20px"
  };
`
);

interface AvatarFallbackProps {
  size?: AvatarSize;
}

const AvatarFallback = styled<"div", AvatarFallbackProps>(
  "div",
  (props) => `
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
`
);

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
    if (icon) return <AvatarIcon size={size}>{icon}</AvatarIcon>;
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
    <AvatarWrapper theme={theme} variant={variant} size={size}>
      {src && !imgError && (
        <AvatarImage
          src={src}
          alt={alt}
          size={size}
          onError={handleImageError}
        />
      )}
      {((src && imgError) || !src) && (
        <>
          {content}
          {fallback && <AvatarFallback size={size}>{fallback}</AvatarFallback>}
        </>
      )}
    </AvatarWrapper>
  );
};
