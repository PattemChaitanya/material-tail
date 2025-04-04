import React from "react";
import { useTheme } from "../../theme";
import { Theme as ThemeType } from "../../theme/types";
import styled from "../../utils/styled";
import { keyframes } from "@emotion/react";

export type LinearProgressVariant = "determinate" | "indeterminate" | "buffer";
export type CircularProgressVariant = "determinate" | "indeterminate";
export type ProgressVariant = LinearProgressVariant | "circular";
export type ProgressColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type ProgressSize = "small" | "medium" | "large";

export interface ProgressProps {
  variant?: ProgressVariant;
  color?: ProgressColor;
  size?: ProgressSize;
  disabled?: boolean;
  value?: number;
  bufferValue?: number;
  thickness?: number;
  showValue?: boolean;
}

type Theme = ThemeType & {
  palette: {
    primary: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    secondary: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    error: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    warning: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    info: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    success: {
      main: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
    action: {
      disabled: string;
      disabledBackground: string;
    };
  };
  shape: {
    borderRadius: number;
  };
};

interface ProgressWrapperProps {
  variant?: ProgressVariant;
  size?: ProgressSize;
  disabled?: boolean;
  theme: Theme;
}

interface LinearProgressProps {
  variant?: LinearProgressVariant;
  color?: ProgressColor;
  disabled?: boolean;
  thickness?: number;
  size?: ProgressSize;
  theme: Theme;
}

interface LinearBarProps {
  variant?: LinearProgressVariant;
  color?: ProgressColor;
  disabled?: boolean;
  value?: number;
  bufferValue?: number;
  theme: Theme;
}

interface CircularProgressProps {
  variant?: CircularProgressVariant;
  color?: ProgressColor;
  disabled?: boolean;
  size?: ProgressSize;
  theme: Theme;
}

interface CircularTrackProps {
  color?: ProgressColor;
  disabled?: boolean;
  size?: ProgressSize;
  thickness?: number;
  theme: Theme;
}

interface CircularBarProps {
  variant?: CircularProgressVariant;
  color?: ProgressColor;
  disabled?: boolean;
  value?: number;
  size?: ProgressSize;
  thickness?: number;
  theme: Theme;
}

interface ValueLabelProps {
  color?: ProgressColor;
  disabled?: boolean;
  size?: ProgressSize;
  theme: Theme;
}

const indeterminateKeyframes = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -35%;
  }
`;

const circularKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ProgressWrapper = styled.div<ProgressWrapperProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabledBackground
      : "transparent"};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const LinearProgress = styled.div<LinearProgressProps>`
  position: relative;
  width: 100%;
  height: ${(props) =>
    props.size === "small"
      ? props.thickness || 4
      : props.size === "large"
      ? props.thickness || 8
      : props.thickness || 6}px;
  overflow: hidden;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabledBackground
      : props.color === "primary"
      ? props.theme.palette.primary.light
      : props.color === "secondary"
      ? props.theme.palette.secondary.light
      : props.color === "error"
      ? props.theme.palette.error.light
      : props.color === "warning"
      ? props.theme.palette.warning.light
      : props.color === "info"
      ? props.theme.palette.info.light
      : props.theme.palette.success.light};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
`;

const LinearBar = styled.div<LinearBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.color === "primary"
      ? props.theme.palette.primary.main
      : props.color === "secondary"
      ? props.theme.palette.secondary.main
      : props.color === "error"
      ? props.theme.palette.error.main
      : props.color === "warning"
      ? props.theme.palette.warning.main
      : props.color === "info"
      ? props.theme.palette.info.main
      : props.theme.palette.success.main};
  transition: transform 0.2s ease-in-out;
  transform-origin: left;
  transform: ${(props) =>
    props.variant === "determinate"
      ? `translateX(${((props.value || 0) - 100) * 100}%)`
      : props.variant === "buffer"
      ? `translateX(${((props.value || 0) - 100) * 100}%)`
      : "none"};
  animation: ${(props) =>
      props.variant === "indeterminate" ? indeterminateKeyframes : "none"}
    1.5s infinite;
`;

const CircularProgress = styled.div<CircularProgressProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.size === "small" ? "24px" : props.size === "large" ? "48px" : "36px"};
  height: ${(props) =>
    props.size === "small" ? "24px" : props.size === "large" ? "48px" : "36px"};
`;

const CircularTrack = styled.circle<CircularTrackProps>`
  fill: none;
  stroke: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabledBackground
      : props.color === "primary"
      ? props.theme.palette.primary.light
      : props.color === "secondary"
      ? props.theme.palette.secondary.light
      : props.color === "error"
      ? props.theme.palette.error.light
      : props.color === "warning"
      ? props.theme.palette.warning.light
      : props.color === "info"
      ? props.theme.palette.info.light
      : props.theme.palette.success.light};
  stroke-width: ${(props) =>
    props.size === "small"
      ? props.thickness || 2
      : props.size === "large"
      ? props.thickness || 4
      : props.thickness || 3};
`;

const CircularBar = styled.circle<CircularBarProps>`
  fill: none;
  stroke: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.color === "primary"
      ? props.theme.palette.primary.main
      : props.color === "secondary"
      ? props.theme.palette.secondary.main
      : props.color === "error"
      ? props.theme.palette.error.main
      : props.color === "warning"
      ? props.theme.palette.warning.main
      : props.color === "info"
      ? props.theme.palette.info.main
      : props.theme.palette.success.main};
  stroke-width: ${(props) =>
    props.size === "small"
      ? props.thickness || 2
      : props.size === "large"
      ? props.thickness || 4
      : props.thickness || 3};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.2s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: center;
  animation: ${(props) =>
      props.variant === "indeterminate" ? circularKeyframes : "none"}
    1.5s infinite;
`;

const ValueLabel = styled.div<ValueLabelProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${(props) =>
    props.size === "small"
      ? "0.75rem"
      : props.size === "large"
      ? "1.25rem"
      : "1rem"};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.color === "primary"
      ? props.theme.palette.primary.main
      : props.color === "secondary"
      ? props.theme.palette.secondary.main
      : props.color === "error"
      ? props.theme.palette.error.main
      : props.color === "warning"
      ? props.theme.palette.warning.main
      : props.color === "info"
      ? props.theme.palette.info.main
      : props.theme.palette.success.main};
`;

export const Progress: React.FC<ProgressProps> = ({
  variant = "determinate",
  color = "primary",
  size = "medium",
  disabled = false,
  value = 0,
  bufferValue = 0,
  thickness,
  showValue = false,
}) => {
  const theme = useTheme();

  const getCircularPath = (value: number) => {
    const radius = size === "small" ? 10 : size === "large" ? 20 : 15;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return {
      radius,
      circumference,
      offset,
    };
  };

  const isCircular = variant === "circular";

  if (isCircular) {
    const { radius, circumference, offset } = getCircularPath(value);
    const circularVariant = "determinate" as CircularProgressVariant;

    return (
      <ProgressWrapper
        variant={variant}
        size={size}
        disabled={disabled}
        theme={theme}
      >
        <CircularProgress
          variant={circularVariant}
          color={color}
          disabled={disabled}
          size={size}
          theme={theme}
        >
          <svg viewBox="0 0 36 36">
            <CircularTrack
              cx="18"
              cy="18"
              r={radius}
              color={color}
              disabled={disabled}
              theme={theme}
              size={size}
            />
            <CircularBar
              variant={circularVariant}
              color={color}
              disabled={disabled}
              value={value}
              size={size}
              theme={theme}
              cx="18"
              cy="18"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={
                circularVariant === "indeterminate" ? 0 : offset
              }
            />
          </svg>
        </CircularProgress>
        {showValue && (
          <ValueLabel color={color} disabled={disabled} theme={theme}>
            {Math.round(value)}%
          </ValueLabel>
        )}
      </ProgressWrapper>
    );
  }

  const linearVariant = variant as LinearProgressVariant;

  return (
    <ProgressWrapper
      variant={variant}
      size={size}
      disabled={disabled}
      theme={theme}
    >
      <LinearProgress
        variant={linearVariant}
        color={color}
        disabled={disabled}
        thickness={thickness}
        size={size}
        theme={theme}
      >
        <LinearBar
          variant={linearVariant}
          color={color}
          disabled={disabled}
          value={value}
          bufferValue={bufferValue}
          theme={theme}
        />
      </LinearProgress>
      {showValue && (
        <ValueLabel color={color} disabled={disabled} theme={theme}>
          {Math.round(value)}%
        </ValueLabel>
      )}
    </ProgressWrapper>
  );
};
