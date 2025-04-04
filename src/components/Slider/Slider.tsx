import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type SliderColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: SliderColor;
  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  marks?: boolean | { value: number; label: string }[];
  valueLabelDisplay?: "auto" | "on" | "off";
  valueLabelFormat?: (value: number) => string;
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium";
  track?: "normal" | "inverted" | false;
  thumb?: boolean;
}

interface SliderWrapperProps {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium";
  theme: Theme;
}

const StyledSliderWrapper = styled.div<SliderWrapperProps>`
  position: relative;
  width: ${(props) => (props.orientation === "vertical" ? "40px" : "100%")};
  height: ${(props) => (props.orientation === "vertical" ? "100%" : "40px")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

interface SliderTrackProps {
  color?: SliderColor;
  track?: "normal" | "inverted" | false;
  theme: Theme;
}

const StyledSliderTrack = styled.div<SliderTrackProps>`
  position: absolute;
  width: ${(props) => (props.track === false ? "0" : "100%")};
  height: ${(props) => (props.track === false ? "0" : "4px")};
  background-color: ${(props) =>
    props.track === "inverted"
      ? props.theme.palette.background.paper
      : props.theme.palette[props.color || "primary"].main};
  border-radius: 2px;
  top: 50%;
  transform: translateY(-50%);
`;

interface SliderRailProps {
  color?: SliderColor;
  theme: Theme;
}

const StyledSliderRail = styled.div<SliderRailProps>`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].light};
  border-radius: 2px;
  top: 50%;
  transform: translateY(-50%);
`;

interface SliderThumbProps {
  color?: SliderColor;
  size?: "small" | "medium";
  theme: Theme;
}

const StyledSliderThumb = styled.div<SliderThumbProps>`
  position: absolute;
  width: ${(props) => (props.size === "small" ? "12px" : "16px")};
  height: ${(props) => (props.size === "small" ? "12px" : "16px")};
  background-color: ${(props) => props.theme.palette.background.paper};
  border: 2px solid
    ${(props) => props.theme.palette[props.color || "primary"].main};
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 8px
      ${(props) => props.theme.palette[props.color || "primary"].light};
  }

  &:focus {
    box-shadow: 0 0 0 8px
      ${(props) => props.theme.palette[props.color || "primary"].light};
    outline: none;
  }
`;

interface SliderMarkProps {
  color?: SliderColor;
  theme: Theme;
}

const StyledSliderMark = styled.div<SliderMarkProps>`
  position: absolute;
  width: 2px;
  height: 8px;
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].main};
  border-radius: 1px;
  top: 50%;
  transform: translate(-50%, -50%);
`;

interface SliderMarkLabelProps {
  color?: SliderColor;
  theme: Theme;
}

const StyledSliderMarkLabel = styled.div<SliderMarkLabelProps>`
  position: absolute;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${(props) => props.theme.palette.text.secondary};
  top: -20px;
  transform: translateX(-50%);
`;

interface SliderValueLabelProps {
  color?: SliderColor;
  theme: Theme;
}

const StyledSliderValueLabel = styled.div<SliderValueLabelProps>`
  position: absolute;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${(props) => props.theme.palette.background.paper};
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].main};
  padding: 2px 4px;
  border-radius: 2px;
  top: -30px;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color = "primary",
  onChange,
  onChangeCommitted,
  marks = false,
  valueLabelDisplay = "off",
  valueLabelFormat,
  orientation = "horizontal",
  size = "medium",
  track = "normal",
  thumb = true,
}) => {
  const theme = useTheme();
  const [currentValue, setCurrentValue] = React.useState(value ?? defaultValue);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateValue(e);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    onChangeCommitted?.(currentValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const updateValue = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = orientation === "horizontal" ? e.clientX : e.clientY;
    const start = orientation === "horizontal" ? rect.left : rect.top;
    const size = orientation === "horizontal" ? rect.width : rect.height;

    let newValue = ((position - start) / size) * (max - min) + min;
    newValue = Math.round(newValue / step) * step;
    newValue = Math.min(Math.max(newValue, min), max);

    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const getMarkPositions = () => {
    if (marks === false) return [];
    if (marks === true) {
      return Array.from({ length: (max - min) / step + 1 }, (_, i) => ({
        value: min + i * step,
        label: String(min + i * step),
      }));
    }
    return marks;
  };

  const showValueLabel =
    valueLabelDisplay === "on" ||
    (valueLabelDisplay === "auto" && (isDragging || isHovered));

  return (
    <StyledSliderWrapper
      ref={sliderRef}
      disabled={disabled}
      orientation={orientation}
      size={size}
      theme={theme}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledSliderRail color={color} theme={theme} />
      <StyledSliderTrack color={color} track={track} theme={theme} />
      {thumb && (
        <StyledSliderThumb
          color={color}
          size={size}
          theme={theme}
          style={{
            left: `${((currentValue - min) / (max - min)) * 100}%`,
          }}
        />
      )}
      {getMarkPositions().map((mark) => (
        <React.Fragment key={mark.value}>
          <StyledSliderMark
            color={color}
            theme={theme}
            style={{
              left: `${((mark.value - min) / (max - min)) * 100}%`,
            }}
          />
          <StyledSliderMarkLabel
            color={color}
            theme={theme}
            style={{
              left: `${((mark.value - min) / (max - min)) * 100}%`,
            }}
          >
            {mark.label}
          </StyledSliderMarkLabel>
        </React.Fragment>
      ))}
      {showValueLabel && (
        <StyledSliderValueLabel
          color={color}
          theme={theme}
          style={{
            left: `${((currentValue - min) / (max - min)) * 100}%`,
          }}
        >
          {valueLabelFormat ? valueLabelFormat(currentValue) : currentValue}
        </StyledSliderValueLabel>
      )}
    </StyledSliderWrapper>
  );
};
