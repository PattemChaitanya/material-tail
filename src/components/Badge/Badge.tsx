import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";
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

interface BadgeWrapperProps extends StyledProps {
  variant: BadgeVariant;
  size: BadgeSize;
  color: BadgeColor;
}

const BadgeWrapper = styled<"div", BadgeWrapperProps>(
  "div",
  (props) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
  height: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
  padding: 0 6px;
  border-radius: 10px;
  background: ${props.theme.palette[props.color].main};
  color: ${props.theme.palette[props.color].contrastText};
  font-family: ${props.theme.typography.fontFamily};
  font-size: ${
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "0.875rem"
      : "0.75rem"
  };
  font-weight: ${props.theme.typography.fontWeightMedium};
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.2s ease-in-out;

  ${
    props.variant === "dot"
      ? `
    padding: 0;
    min-width: ${
      props.size === "small" ? "8px" : props.size === "large" ? "12px" : "10px"
    };
    height: ${
      props.size === "small" ? "8px" : props.size === "large" ? "12px" : "10px"
    };
    border-radius: 50%;
    `
      : ""
  }
`
);

interface BadgeContentProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  position?: BadgePosition;
  theme: any;
}

const BadgeContent = styled<"span", BadgeContentProps>(
  "span",
  (props) => `
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${
    props.variant === "dot"
      ? props.size === "small"
        ? "6px"
        : props.size === "large"
        ? "10px"
        : "8px"
      : "auto"
  };
  height: ${
    props.variant === "dot"
      ? props.size === "small"
        ? "6px"
        : props.size === "large"
        ? "10px"
        : "8px"
      : props.size === "small"
      ? "16px"
      : props.size === "large"
      ? "24px"
      : "20px"
  };
  padding: ${
    props.variant === "dot"
      ? "0"
      : props.size === "small"
      ? "0 4px"
      : props.size === "large"
      ? "0 8px"
      : "0 6px"
  };
  font-size: ${
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "1rem"
      : "0.875rem"
  };
  font-weight: ${props.theme.typography.fontWeightMedium};
  border-radius: ${
    props.variant === "dot"
      ? "50%"
      : props.size === "small"
      ? "8px"
      : props.size === "large"
      ? "12px"
      : "10px"
  };
  background: ${props.theme.palette[props.color || "primary"].main};
  color: ${props.theme.palette[props.color || "primary"].contrastText};
  box-shadow: ${props.theme.shadows[1]};
  z-index: 1;
  transform: ${(() => {
    switch (props.position) {
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
  })()};
  top: ${
    props.position?.includes("top")
      ? "0"
      : props.position?.includes("bottom")
      ? "100%"
      : "0"
  };
  right: ${
    props.position?.includes("right")
      ? "0"
      : props.position?.includes("left")
      ? "100%"
      : "0"
  };
`
);

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
      variant={variant}
      color={badgeColor}
      size={size}
    >
      {variant === "standard" && children}
      {content !== null && (
        <BadgeContent
          variant={variant}
          color={badgeColor}
          size={size}
          position={position}
          theme={theme}
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
