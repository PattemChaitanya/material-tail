import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import { styled } from "../../utils/styled";

export type InputVariant = "outlined" | "filled" | "standard";
export type InputColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  required?: boolean;
  theme?: Theme;
}

interface InputWrapperProps {
  fullWidth?: boolean;
}

const InputWrapper = styled<"div", InputWrapperProps>(
  "div",
  (props) => `
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${props.fullWidth ? "100%" : "auto"};
  min-width: 200px;
`
);

interface LabelProps {
  error?: boolean;
  color?: InputColor;
  variant?: InputVariant;
  size?: InputSize;
  theme: Theme;
}

const Label = styled<"label", LabelProps>(
  "label",
  (props) => `
  position: absolute;
  left: ${props.variant === "outlined" ? "14px" : "0"};
  top: ${(() => {
    if (props.variant === "outlined") return "-9px";
    if (props.size === "small") return "4px";
    if (props.size === "large") return "8px";
    return "6px";
  })()};
  background: ${
    props.variant === "outlined"
      ? props.theme.palette.background.paper
      : "transparent"
  };
  padding: ${props.variant === "outlined" ? "0 4px" : "0"};
  color: ${
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette[props.color || "primary"].main
  };
  font-size: ${(() => {
    if (props.size === "small") return "0.75rem";
    if (props.size === "large") return "1rem";
    return "0.875rem";
  })()};
  font-weight: ${props.theme.typography.fontWeightMedium};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`
);

interface InputContainerProps {
  variant?: InputVariant;
  error?: boolean;
  color?: InputColor;
  size?: InputSize;
  theme: Theme;
}

const InputContainer = styled<"div", InputContainerProps>(
  "div",
  (props) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  ${(() => {
    switch (props.variant) {
      case "outlined":
        return `
          border: 1px solid ${
            props.error
              ? props.theme.palette.error.main
              : props.theme.palette[props.color || "primary"].main
          };
          border-radius: ${props.theme.shape.borderRadius}px;
          &:hover {
            border-color: ${
              props.error
                ? props.theme.palette.error.dark
                : props.theme.palette[props.color || "primary"].dark
            };
          }
          &:focus-within {
            border-color: ${
              props.error
                ? props.theme.palette.error.main
                : props.theme.palette[props.color || "primary"].main
            };
            border-width: 2px;
          }
        `;
      case "filled":
        return `
          border-bottom: 1px solid ${
            props.error
              ? props.theme.palette.error.main
              : props.theme.palette[props.color || "primary"].main
          };
          border-radius: ${props.theme.shape.borderRadius}px ${
          props.theme.shape.borderRadius
        }px 0 0;
          background: ${
            props.error
              ? props.theme.palette.error.light + "15"
              : props.theme.palette[props.color || "primary"].light + "15"
          };
          &:hover {
            background: ${
              props.error
                ? props.theme.palette.error.light + "25"
                : props.theme.palette[props.color || "primary"].light + "25"
            };
          }
          &:focus-within {
            border-bottom-width: 2px;
          }
        `;
      case "standard":
      default:
        return `
          border-bottom: 1px solid ${
            props.error
              ? props.theme.palette.error.main
              : props.theme.palette[props.color || "primary"].main
          };
          &:hover {
            border-bottom-color: ${
              props.error
                ? props.theme.palette.error.dark
                : props.theme.palette[props.color || "primary"].dark
            };
          }
          &:focus-within {
            border-bottom-width: 2px;
          }
        `;
    }
  })()}
`
);

interface StyledInputWrapperProps {
  variant?: InputVariant;
  size?: InputSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  theme: Theme;
}

const StyledInputWrapper = styled<"div", StyledInputWrapperProps>(
  "div",
  (props) => `
  width: 100%;
  padding: ${(() => {
    if (props.variant === "outlined") {
      if (props.size === "small") return "8px 12px";
      if (props.size === "large") return "16px 12px";
      return "12px";
    }
    if (props.size === "small") return "4px 0";
    if (props.size === "large") return "8px 0";
    return "6px 0";
  })()};
  font-size: ${(() => {
    if (props.size === "small") return "0.875rem";
    if (props.size === "large") return "1.25rem";
    return "1rem";
  })()};
  line-height: 1.4375em;
  color: ${props.theme.palette.text.primary};
  background: transparent;
  border: none;
  outline: none;

  &:disabled {
    color: ${props.theme.palette.text.secondary};
    cursor: not-allowed;
  }
`
);

const StyledInput: React.FC<
  StyledInputWrapperProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ variant, size, startIcon, endIcon, theme, ...props }) => {
  return (
    <StyledInputWrapper
      variant={variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      theme={theme}
    >
      <input {...props} />
    </StyledInputWrapper>
  );
};

interface HelperTextProps {
  error?: boolean;
  color?: InputColor;
  theme: Theme;
}

const HelperText = styled<"div", HelperTextProps>(
  "div",
  (props) => `
  margin-top: 3px;
  font-size: 0.75rem;
  color: ${
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette[props.color || "primary"].main
  };
  min-height: 1em;
`
);

interface IconWrapperProps {
  position: "start" | "end";
  theme: Theme;
}

const IconWrapper = styled<"div", IconWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props.position === "start" ? "0 8px 0 12px" : "0 12px 0 8px"};
  color: ${props.theme.palette.text.secondary};
`
);

export const Input: React.FC<InputProps> = ({
  variant = "outlined",
  color = "primary",
  size = "medium",
  label,
  error,
  helperText,
  fullWidth,
  startIcon,
  endIcon,
  required,
  disabled,
  theme,
  ...props
}) => {
  const themeFromProps = useTheme();

  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && (
        <Label
          theme={theme || themeFromProps}
          variant={variant}
          error={error}
          color={color}
          size={size}
        >
          {label}
          {required && " *"}
        </Label>
      )}
      <InputContainer
        theme={theme || themeFromProps}
        variant={variant}
        error={error}
        color={color}
        size={size}
      >
        {startIcon && (
          <IconWrapper position="start" theme={theme || themeFromProps}>
            {startIcon}
          </IconWrapper>
        )}
        <StyledInput
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
          {...props}
        />
        {endIcon && (
          <IconWrapper position="end" theme={theme || themeFromProps}>
            {endIcon}
          </IconWrapper>
        )}
      </InputContainer>
      {helperText && (
        <HelperText theme={theme || themeFromProps} error={error} color={color}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};
