import React from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";

export type CheckboxVariant = "default" | "outlined";
export type CheckboxColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: string;
  error?: boolean;
  indeterminate?: boolean;
  required?: boolean;
}

interface CheckboxWrapperProps {
  disabled?: boolean;
}

const CheckboxWrapper = styled<"div", CheckboxWrapperProps>(
  "div",
  (props) => `
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${props.disabled ? "not-allowed" : "pointer"};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`
);

interface CheckboxInputProps {
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;
  error?: boolean;
  indeterminate?: boolean;
  theme: any;
}

const CheckboxInput = styled<"input", CheckboxInputProps>(
  "input",
  (props) => `
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: ${props.theme.palette[props.color || "primary"].main};
    border-color: ${props.theme.palette[props.color || "primary"].main};
    color: ${props.theme.palette.background.paper};
  }

  &:checked + span:after {
    display: block;
  }

  &:focus + span {
    box-shadow: 0 0 0 2px ${
      props.theme.palette[props.color || "primary"].main
    }40;
  }

  &:disabled + span {
    background-color: ${props.theme.palette.background.paper};
    border-color: ${props.theme.palette.text.disabled};
    cursor: not-allowed;
  }

  &:disabled:checked + span {
    background-color: ${props.theme.palette.text.disabled};
  }
`
);

interface CheckboxSpanProps {
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;
  error?: boolean;
  indeterminate?: boolean;
  theme: any;
}

const CheckboxSpan = styled<"span", CheckboxSpanProps>(
  "span",
  (props) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 2px solid ${
    props.error
      ? props.theme.palette.error.main
      : props.theme.palette[props.color || "primary"].main
  };
  border-radius: ${props.variant === "outlined" ? "4px" : "50%"};
  background-color: ${props.theme.palette.background.paper};
  transition: all 0.2s ease-in-out;

  ${(() => {
    switch (props.size) {
      case "small":
        return `
          width: 16px;
          height: 16px;
        `;
      case "large":
        return `
          width: 24px;
          height: 24px;
        `;
      default:
        return `
          width: 20px;
          height: 20px;
        `;
    }
  })()}

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  ${
    props.indeterminate
      ? `
    background-color: ${props.theme.palette[props.color || "primary"].main};
    border-color: ${props.theme.palette[props.color || "primary"].main};
    color: ${props.theme.palette.background.paper};

    &:after {
      display: block;
      width: 10px;
      height: 2px;
      border: none;
      background-color: ${props.theme.palette.background.paper};
      transform: translate(-50%, -50%);
    }
  `
      : ""
  }
`
);

interface LabelProps {
  size?: CheckboxSize;
  disabled?: boolean;
  error?: boolean;
  color?: CheckboxColor;
  theme: any;
}

const Label = styled<"label", LabelProps>("label", (props) => {
  const size = props.size ?? "medium";
  return `
    margin-left: ${size === "small" ? "8px" : "12px"};
    font-family: ${props.theme.typography.fontFamily};
    font-size: ${
      size === "small" ? "0.875rem" : size === "large" ? "1.25rem" : "1rem"
    };
    color: ${
      props.disabled
        ? props.theme.palette.text.disabled
        : props.error
        ? props.theme.palette.error.main
        : props.theme.palette.text.primary
    };
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
  `;
});

export const Checkbox: React.FC<CheckboxProps> = ({
  variant = "default",
  color = "primary",
  size = "medium",
  label,
  error,
  indeterminate,
  required,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  return (
    <CheckboxWrapper disabled={disabled}>
      <CheckboxInput
        type="checkbox"
        theme={theme}
        variant={variant}
        color={color}
        size={size}
        error={error}
        indeterminate={indeterminate}
        disabled={disabled}
        {...props}
      />
      <CheckboxSpan
        theme={theme}
        variant={variant}
        color={color}
        size={size}
        error={error}
        indeterminate={indeterminate}
      />
      {label && (
        <Label
          theme={theme}
          size={size}
          disabled={disabled}
          error={error}
          color={color}
        >
          {label}
          {required && " *"}
        </Label>
      )}
    </CheckboxWrapper>
  );
};
