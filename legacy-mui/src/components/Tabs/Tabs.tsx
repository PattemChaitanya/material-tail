import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type TabsVariant = "standard" | "contained" | "fullWidth";
export type TabsColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsAlignment = "start" | "center" | "end";

export interface TabsProps {
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
  alignment?: TabsAlignment;
  value: number;
  onChange: (value: number) => void;
  children: React.ReactNode;
  scrollable?: boolean;
}

export interface TabProps {
  value: number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface TabsWrapperProps {
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
  alignment?: TabsAlignment;
  scrollable?: boolean;
  theme: Theme;
}

interface TabListProps {
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  theme: Theme;
}

interface TabIndicatorProps {
  orientation?: TabsOrientation;
  color?: TabsColor;
  theme: Theme;
}

interface StyledTabProps {
  selected?: boolean;
  disabled?: boolean;
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
  theme: Theme;
}

interface TabContentProps {
  selected?: boolean;
}

const TabsWrapper = styled.div<TabsWrapperProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === "vertical" ? "column" : "row"};
  justify-content: ${(props) =>
    props.alignment === "start"
      ? "flex-start"
      : props.alignment === "center"
      ? "center"
      : "flex-end"};
  position: relative;
  min-height: 48px;
  overflow-x: ${(props) =>
    props.orientation === "horizontal" && props.scrollable ? "auto" : "hidden"};
  overflow-y: ${(props) =>
    props.orientation === "vertical" && props.scrollable ? "auto" : "hidden"};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabList = styled.div<TabListProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === "vertical" ? "column" : "row"};
  position: relative;
  width: ${(props) =>
    props.orientation === "vertical"
      ? props.variant === "fullWidth"
        ? "100%"
        : "auto"
      : "auto"};
`;

const TabIndicator = styled.div<TabIndicatorProps>`
  position: absolute;
  ${(props) =>
    props.orientation === "vertical"
      ? "left: 0; width: 2px; height: 0;"
      : "bottom: 0; height: 2px; width: 0;"}
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].main};
  transition: all 0.3s ease-in-out;
`;

const Tab = styled.button<StyledTabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 12px 16px;
  border: none;
  background: ${(props) =>
    props.variant === "contained"
      ? props.selected
        ? props.theme.palette[props.color || "primary"].main
        : "transparent"
      : "transparent"};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.text.disabled
      : props.variant === "contained"
      ? props.selected
        ? props.theme.palette[props.color || "primary"].contrastText
        : props.theme.palette.text.primary
      : props.selected
      ? props.theme.palette[props.color || "primary"].main
      : props.theme.palette.text.primary};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-size: 0.875rem;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  text-transform: uppercase;
  letter-spacing: 0.02857em;
  transition: all 0.2s ease-in-out;
  flex: ${(props) => (props.variant === "fullWidth" ? 1 : "none")};

  &:hover {
    background: ${(props) =>
      props.disabled
        ? "transparent"
        : props.variant === "contained"
        ? props.theme.palette[props.color || "primary"].dark
        : props.theme.palette.action.hover};
  }
`;

const TabContent = styled.div<TabContentProps>`
  display: ${(props) => (props.selected ? "block" : "none")};
`;

export const TabsComponent: React.FC<TabsProps> = ({
  variant = "standard",
  color = "primary",
  orientation = "horizontal",
  alignment = "start",
  value,
  onChange,
  children,
  scrollable = false,
}) => {
  const theme = useTheme();
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});

  React.useEffect(() => {
    const updateIndicator = () => {
      const tabList = tabListRef.current;
      if (!tabList) return;

      const activeTab = tabList.children[value] as HTMLElement;
      if (!activeTab) return;

      if (orientation === "horizontal") {
        setIndicatorStyle({
          left: `${activeTab.offsetLeft}px`,
          width: `${activeTab.offsetWidth}px`,
        });
      } else {
        setIndicatorStyle({
          top: `${activeTab.offsetTop}px`,
          height: `${activeTab.offsetHeight}px`,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [value, orientation]);

  return (
    <TabsWrapper
      variant={variant}
      color={color}
      orientation={orientation}
      alignment={alignment}
      scrollable={scrollable}
      theme={theme}
      role="tablist"
    >
      <TabList
        ref={tabListRef}
        orientation={orientation}
        variant={variant}
        theme={theme}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement<TabProps>(child)) return null;
          const tabProps = child.props;
          return (
            <Tab
              role="tab"
              aria-selected={value === index}
              aria-disabled={tabProps.disabled}
              selected={value === index}
              disabled={tabProps.disabled}
              variant={variant}
              color={color}
              orientation={orientation}
              theme={theme}
              onClick={() => !tabProps.disabled && onChange(index)}
              tabIndex={value === index ? 0 : -1}
            >
              {tabProps.icon}
              {tabProps.label}
            </Tab>
          );
        })}
        <TabIndicator
          orientation={orientation}
          color={color}
          theme={theme}
          style={indicatorStyle}
        />
      </TabList>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<TabProps>(child)) return null;
        return (
          <TabContent
            role="tabpanel"
            selected={value === index}
            hidden={value !== index}
          >
            {child.props.children}
          </TabContent>
        );
      })}
    </TabsWrapper>
  );
};

export const TabPanel: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs = {
  Root: TabsComponent,
  Panel: TabPanel,
};
