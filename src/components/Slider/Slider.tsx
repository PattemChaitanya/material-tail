import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../../theme";
import { styled } from "../../utils/styled";
import { Theme as ThemeType } from "../../theme/types";

export type SliderVariant = "continuous" | "discrete" | "range";
export type SliderColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type SliderSize = "small" | "medium";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  variant?: SliderVariant;
  color?: SliderColor;
  size?: SliderSize;
  disabled?: boolean;
  marks?: boolean | SliderMark[];
  step?: number;
  min?: number;
  max?: number;
  value: number | number[];
  onChange: (value: number | number[]) => void;
  onChangeCommitted?: (value: number) => void;
  valueLabelDisplay?: "auto" | "on" | "off";
  orientation?: SliderOrientation;
  track?: "normal" | "inverted" | false;
  thumb?: boolean;
  valueLabelFormat?: (value: number) => string;
}

type Theme = ThemeType & {
  palette: {
    action: {
      disabled: string;
      disabledBackground: string;
      hover: string;
    };
    default: {
      main: string;
      contrastText?: string;
    };
  };
};

interface SliderWrapperProps {
  orientation?: SliderOrientation;
  size?: SliderSize;
  disabled?: boolean;
  theme: Theme;
}

interface SliderTrackProps {
  orientation?: SliderOrientation;
  color?: SliderColor;
  disabled?: boolean;
  theme: Theme;
}

interface SliderRailProps {
  orientation?: SliderOrientation;
  disabled?: boolean;
  theme: Theme;
}

interface SliderThumbProps {
  orientation?: SliderOrientation;
  color?: SliderColor;
  size?: SliderSize;
  disabled?: boolean;
  theme: Theme;
}

interface SliderMarkProps {
  orientation?: SliderOrientation;
  disabled?: boolean;
  theme: Theme;
}

interface SliderMarkLabelProps {
  orientation?: SliderOrientation;
  disabled?: boolean;
  theme: Theme;
}

interface SliderValueLabelProps {
  orientation?: SliderOrientation;
  color?: SliderColor;
  theme: Theme;
}

const SliderWrapper = styled<"div", SliderWrapperProps>(
  "div",
  ({ orientation, size, disabled, theme }) => `
    display: flex;
    align-items: center;
    width: ${
      orientation === "vertical" ? "auto" : size === "small" ? "100px" : "200px"
    };
    height: ${
      orientation === "vertical"
        ? size === "small"
          ? "100px"
          : "200px"
        : "auto"
    };
    padding: ${
      orientation === "vertical"
        ? `${size === "small" ? "8px" : "12px"} 0`
        : `0 ${size === "small" ? "8px" : "12px"}`
    };
    cursor: ${disabled ? "default" : "pointer"};
    opacity: ${disabled ? 0.5 : 1};
  `
);

const SliderTrack = styled<"div", SliderTrackProps>(
  "div",
  ({ orientation, color = "primary", disabled, theme }) => `
    position: relative;
    width: ${orientation === "vertical" ? "2px" : "100%"};
    height: ${orientation === "vertical" ? "100%" : "2px"};
    background-color: ${
      disabled
        ? theme.palette.action.disabled
        : color === "default"
        ? theme.palette.default.main
        : theme.palette[color].main
    };
    border-radius: 1px;
  `
);

const SliderRail = styled<"div", SliderRailProps>(
  "div",
  ({ orientation, disabled, theme }) => `
    position: absolute;
    width: ${orientation === "vertical" ? "2px" : "100%"};
    height: ${orientation === "vertical" ? "100%" : "2px"};
    background-color: ${
      disabled
        ? theme.palette.action.disabledBackground
        : theme.palette.action.hover
    };
    border-radius: 1px;
  `
);

const SliderThumb = styled<"div", SliderThumbProps>(
  "div",
  ({ orientation, color = "primary", size, disabled, theme }) => `
    position: absolute;
    width: ${size === "small" ? "12px" : "16px"};
    height: ${size === "small" ? "12px" : "16px"};
    background-color: ${
      disabled
        ? theme.palette.action.disabled
        : color === "default"
        ? theme.palette.default.main
        : theme.palette[color].main
    };
    border: 2px solid ${
      disabled
        ? theme.palette.action.disabled
        : color === "default"
        ? theme.palette.default.main
        : theme.palette[color].main
    };
    border-radius: 50%;
    transform: translate(
      ${orientation === "vertical" ? "50%" : "-50%"},
      ${orientation === "vertical" ? "-50%" : "50%"}
    );
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 4px ${
        disabled
          ? "transparent"
          : color === "default"
          ? `${theme.palette.default.main}40`
          : `${theme.palette[color].main}40`
      };
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 4px ${
        disabled
          ? "transparent"
          : color === "default"
          ? `${theme.palette.default.main}40`
          : `${theme.palette[color].main}40`
      };
    }
  `
);

const SliderMark = styled<"div", SliderMarkProps>(
  "div",
  ({ disabled, theme }) => `
    position: absolute;
    width: 2px;
    height: 2px;
    background-color: ${
      disabled ? theme.palette.action.disabled : theme.palette.text.primary
    };
    border-radius: 50%;
  `
);

const SliderMarkLabel = styled<"div", SliderMarkLabelProps>(
  "div",
  ({ orientation, disabled, theme }) => `
    position: absolute;
    font-size: 0.75rem;
    color: ${
      disabled ? theme.palette.action.disabled : theme.palette.text.secondary
    };
    transform: translate(
      ${orientation === "vertical" ? "100%" : "-50%"},
      ${orientation === "vertical" ? "-50%" : "100%"}
    );
    margin-top: ${orientation === "vertical" ? "0" : "8px"};
    margin-left: ${orientation === "vertical" ? "8px" : "0"};
  `
);

const SliderValueLabel = styled<"div", SliderValueLabelProps>(
  "div",
  ({ orientation, color = "primary", theme }) => `
    position: absolute;
    background-color: ${
      color === "default"
        ? theme.palette.default.main
        : theme.palette[color].main
    };
    color: ${
      color === "default"
        ? theme.palette.default.contrastText || "#fff"
        : theme.palette[color].contrastText || "#fff"
    };
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    transform: translate(
      ${orientation === "vertical" ? "100%" : "-50%"},
      ${orientation === "vertical" ? "-50%" : "-100%"}
    );
    margin-top: ${orientation === "vertical" ? "0" : "-8px"};
    margin-left: ${orientation === "vertical" ? "8px" : "0"};
    white-space: nowrap;
    pointer-events: none;
  `
);

export const SliderComponent: React.FC<SliderProps> = ({
  variant = "continuous",
  color = "primary",
  size = "medium",
  disabled = false,
  marks = false,
  step = 1,
  min = 0,
  max = 100,
  value,
  onChange,
  onChangeCommitted,
  valueLabelDisplay = "auto",
  orientation = "horizontal",
  track = "normal",
  thumb = true,
  valueLabelFormat,
}) => {
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const [valueLabel, setValueLabel] = useState<number | null>(null);

  const getValueFromPosition = useCallback(
    (position: number): number => {
      if (!wrapperRef.current) return 0;

      const rect = wrapperRef.current.getBoundingClientRect();
      const size = orientation === "vertical" ? rect.height : rect.width;
      const positionInPixels =
        orientation === "vertical"
          ? rect.bottom - position
          : position - rect.left;

      const percentage = positionInPixels / size;
      const range = max - min;
      const value = min + percentage * range;

      if (variant === "discrete") {
        const steps = Math.round((value - min) / step);
        return Math.min(max, Math.max(min, min + steps * step));
      }

      return Math.min(max, Math.max(min, value));
    },
    [max, min, orientation, step, variant]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, thumbIndex: number) => {
      if (disabled) return;
      setIsDragging(true);
      setActiveThumb(thumbIndex);
      const currentValue = Array.isArray(value) ? value[thumbIndex] : value;
      setValueLabel(currentValue);
    },
    [disabled, value]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !wrapperRef.current) return;

      const position =
        orientation === "vertical" ? event.clientY : event.clientX;
      const newValue = getValueFromPosition(position);

      if (Array.isArray(value)) {
        const newValues = [...value];
        if (activeThumb !== null) {
          newValues[activeThumb] = newValue;
          onChange(newValues);
        }
      } else {
        onChange(newValue);
      }
    },
    [
      isDragging,
      orientation,
      getValueFromPosition,
      value,
      onChange,
      activeThumb,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setActiveThumb(null);
    setValueLabel(null);

    if (onChangeCommitted && !Array.isArray(value)) {
      onChangeCommitted(value);
    }
  }, [isDragging, onChangeCommitted, value]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const renderMarks = () => {
    if (!marks) return null;

    const markPoints = Array.isArray(marks)
      ? marks
      : [
          { value: min, label: min.toString() },
          { value: max, label: max.toString() },
        ];

    return markPoints.map((mark) => (
      <React.Fragment key={mark.value}>
        <SliderMark
          orientation={orientation}
          disabled={disabled}
          theme={theme}
          style={{
            [orientation === "vertical" ? "bottom" : "left"]: `${
              ((mark.value - min) / (max - min)) * 100
            }%`,
          }}
        />
        {mark.label && (
          <SliderMarkLabel
            orientation={orientation}
            disabled={disabled}
            theme={theme}
            style={{
              [orientation === "vertical" ? "bottom" : "left"]: `${
                ((mark.value - min) / (max - min)) * 100
              }%`,
            }}
          >
            {mark.label}
          </SliderMarkLabel>
        )}
      </React.Fragment>
    ));
  };

  const renderThumb = (thumbValue: number, index: number) => {
    if (!thumb) return null;

    const percentage = ((thumbValue - min) / (max - min)) * 100;
    const showValueLabel =
      valueLabelDisplay === "on" ||
      (valueLabelDisplay === "auto" && isDragging && activeThumb === index);

    return (
      <React.Fragment key={index}>
        <SliderThumb
          orientation={orientation}
          color={color}
          size={size}
          disabled={disabled}
          theme={theme}
          style={{
            [orientation === "vertical" ? "bottom" : "left"]: `${percentage}%`,
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={thumbValue}
          tabIndex={disabled ? -1 : 0}
        />
        {showValueLabel && (
          <SliderValueLabel
            orientation={orientation}
            color={color}
            theme={theme}
            style={{
              [orientation === "vertical"
                ? "bottom"
                : "left"]: `${percentage}%`,
            }}
          >
            {valueLabelFormat ? valueLabelFormat(thumbValue) : thumbValue}
          </SliderValueLabel>
        )}
      </React.Fragment>
    );
  };

  return (
    <SliderWrapper
      ref={wrapperRef}
      orientation={orientation}
      size={size}
      disabled={disabled}
      theme={theme}
    >
      <SliderTrack
        orientation={orientation}
        color={color}
        disabled={disabled}
        theme={theme}
      >
        <SliderRail
          orientation={orientation}
          disabled={disabled}
          theme={theme}
        />
        {renderMarks()}
        {Array.isArray(value)
          ? value.map((v, i) => renderThumb(v, i))
          : renderThumb(value, 0)}
      </SliderTrack>
    </SliderWrapper>
  );
};

export const Slider = {
  Root: SliderComponent,
};
