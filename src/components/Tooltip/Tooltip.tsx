import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import { styled } from "../../utils/styled";

export type TooltipVariant = "standard" | "light" | "dark";
export type TooltipColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type TooltipSize = "small" | "medium" | "large";
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  variant?: TooltipVariant;
  color?: TooltipColor;
  size?: TooltipSize;
  position?: TooltipPosition;
  arrow?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  children: React.ReactNode;
  title: React.ReactNode;
}

interface TooltipWrapperProps {
  position?: TooltipPosition;
  size?: TooltipSize;
  theme: Theme;
}

const TooltipWrapper = styled<"div", TooltipWrapperProps>(
  "div",
  (props) => `
  position: relative;
  display: inline-block;
  width: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
  height: ${
    props.size === "small" ? "16px" : props.size === "large" ? "24px" : "20px"
  };
`
);

interface TooltipContentProps {
  variant?: TooltipVariant;
  color?: TooltipColor;
  size?: TooltipSize;
  position?: TooltipPosition;
  arrow?: boolean;
  theme: Theme;
}

const TooltipContent = styled<"div", TooltipContentProps>(
  "div",
  (props) => `
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${
    props.size === "small"
      ? "4px 8px"
      : props.size === "large"
      ? "8px 16px"
      : "6px 12px"
  };
  font-size: ${
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "1rem"
      : "0.875rem"
  };
  font-weight: ${props.theme.typography.fontWeightRegular};
  line-height: ${
    props.size === "small" ? "1.25" : props.size === "large" ? "1.5" : "1.25"
  };
  border-radius: ${props.theme.shape.borderRadius}px;
  background: ${(() => {
    if (props.variant === "light") return props.theme.palette.background.paper;
    if (props.variant === "dark") return props.theme.palette.grey[800];
    return props.theme.palette[props.color || "default"].main;
  })()};
  color: ${(() => {
    if (props.variant === "light") return props.theme.palette.text.primary;
    if (props.variant === "dark") return props.theme.palette.common.white;
    return props.theme.palette[props.color || "default"].contrastText;
  })()};
  box-shadow: ${props.theme.shadows[4]};
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  pointer-events: none;
  transform: ${(() => {
    switch (props.position) {
      case "top":
        return "translateY(-8px)";
      case "bottom":
        return "translateY(8px)";
      case "left":
        return "translateX(-8px)";
      case "right":
        return "translateX(8px)";
      default:
        return "translateY(-8px)";
    }
  })()};
  top: ${
    props.position === "bottom"
      ? "100%"
      : props.position === "top"
      ? "auto"
      : "50%"
  };
  bottom: ${props.position === "top" ? "100%" : "auto"};
  left: ${
    props.position === "right"
      ? "100%"
      : props.position === "left"
      ? "auto"
      : "50%"
  };
  right: ${props.position === "left" ? "100%" : "auto"};
  margin: ${(() => {
    switch (props.position) {
      case "top":
        return "0 0 8px 0";
      case "bottom":
        return "8px 0 0 0";
      case "left":
        return "0 8px 0 0";
      case "right":
        return "0 0 0 8px";
      default:
        return "0 0 8px 0";
    }
  })()};
  transform-origin: ${(() => {
    switch (props.position) {
      case "top":
        return "bottom center";
      case "bottom":
        return "top center";
      case "left":
        return "right center";
      case "right":
        return "left center";
      default:
        return "bottom center";
    }
  })()};

  ${TooltipWrapper}:hover & {
    opacity: 1;
    visibility: visible;
    transform: ${(() => {
      switch (props.position) {
        case "top":
          return "translateY(-4px)";
        case "bottom":
          return "translateY(4px)";
        case "left":
          return "translateX(-4px)";
        case "right":
          return "translateX(4px)";
        default:
          return "translateY(-4px)";
      }
    })()};
  }
`
);

interface TooltipArrowProps {
  variant?: TooltipVariant;
  color?: TooltipColor;
  position?: TooltipPosition;
  theme: Theme;
}

const TooltipArrow = styled<"div", TooltipArrowProps>(
  "div",
  (props) => `
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${(() => {
    if (props.variant === "light") return props.theme.palette.background.paper;
    if (props.variant === "dark") return props.theme.palette.grey[800];
    return props.theme.palette[props.color || "default"].main;
  })()};
  transform: rotate(45deg);
  z-index: -1;
  box-shadow: ${props.theme.shadows[4]};
  top: ${
    props.position === "bottom"
      ? "-4px"
      : props.position === "top"
      ? "auto"
      : "50%"
  };
  bottom: ${props.position === "top" ? "-4px" : "auto"};
  left: ${
    props.position === "right"
      ? "-4px"
      : props.position === "left"
      ? "auto"
      : "50%"
  };
  right: ${props.position === "left" ? "-4px" : "auto"};
  margin: ${(() => {
    switch (props.position) {
      case "top":
        return "0 0 0 0";
      case "bottom":
        return "0 0 0 0";
      case "left":
        return "0 0 0 0";
      case "right":
        return "0 0 0 0";
      default:
        return "0 0 0 0";
    }
  })()};
`
);

export const Tooltip: React.FC<TooltipProps> = ({
  variant = "standard",
  color = "default",
  size = "medium",
  position = "top",
  arrow = false,
  enterDelay = 0,
  leaveDelay = 0,
  children,
  title,
}) => {
  const theme = useTheme();
  const [show, setShow] = React.useState(false);
  const enterTimeout = React.useRef<NodeJS.Timeout>();
  const leaveTimeout = React.useRef<NodeJS.Timeout>();

  const handleEnter = () => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    enterTimeout.current = setTimeout(() => {
      setShow(true);
    }, enterDelay);
  };

  const handleLeave = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    leaveTimeout.current = setTimeout(() => {
      setShow(false);
    }, leaveDelay);
  };

  React.useEffect(() => {
    return () => {
      if (enterTimeout.current) {
        clearTimeout(enterTimeout.current);
      }
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
      }
    };
  }, []);

  return (
    <TooltipWrapper
      position={position}
      size={size}
      theme={theme}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {show && (
        <TooltipContent
          variant={variant}
          color={color}
          size={size}
          position={position}
          arrow={arrow}
          theme={theme}
          role="tooltip"
        >
          {title}
          {arrow && (
            <TooltipArrow
              variant={variant}
              color={color}
              position={position}
              theme={theme}
            />
          )}
        </TooltipContent>
      )}
    </TooltipWrapper>
  );
};
