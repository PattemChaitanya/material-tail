import React from "react";
import { useTheme } from "../../theme";
import { Theme as ThemeType } from "../../theme/types";
import { styled } from "../../utils/styled";

export type SidebarColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type SidebarVariant = "elevation" | "outlined";

export interface SidebarProps {
  color?: SidebarColor;
  variant?: SidebarVariant;
  elevation?: number;
  width?: number;
  square?: boolean;
  children?: React.ReactNode;
}

export interface SidebarHeaderProps {
  children?: React.ReactNode;
}

export interface SidebarContentProps {
  children?: React.ReactNode;
}

export interface SidebarFooterProps {
  children?: React.ReactNode;
}

export interface SidebarSectionProps {
  title?: string;
  children?: React.ReactNode;
}

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

type Theme = ThemeType & {
  palette: {
    action: {
      selected: string;
      hover: string;
    };
    default: {
      main: string;
    };
  };
  shadows: string[];
};

interface SidebarWrapperProps {
  color?: SidebarColor;
  variant?: SidebarVariant;
  elevation?: number;
  width?: number;
  square?: boolean;
  theme: Theme;
}

interface SidebarHeaderWrapperProps {
  theme: Theme;
}

interface SidebarContentWrapperProps {
  theme: Theme;
}

interface SidebarFooterWrapperProps {
  theme: Theme;
}

interface SidebarSectionWrapperProps {
  theme: Theme;
}

interface SidebarSectionTitleProps {
  theme: Theme;
}

interface SidebarItemWrapperProps {
  selected?: boolean;
  disabled?: boolean;
  theme: Theme;
}

interface SidebarItemIconProps {
  theme: Theme;
}

interface SidebarItemLabelProps {
  theme: Theme;
}

const SidebarWrapper = styled<"aside", SidebarWrapperProps>(
  "aside",
  ({
    color = "primary",
    variant = "elevation",
    elevation = 1,
    width = 240,
    square,
    theme,
  }) => `
    display: flex;
    flex-direction: column;
    width: ${width}px;
    height: 100%;
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
    border-radius: ${square ? 0 : theme.shape.borderRadius}px;
    border: ${
      variant === "outlined"
        ? `1px solid ${
            color === "default"
              ? theme.palette.default.main
              : theme.palette[color].main
          }`
        : "none"
    };
    box-shadow: ${variant === "elevation" ? theme.shadows[elevation] : "none"};
  `
);

const SidebarHeaderWrapper = styled<"div", SidebarHeaderWrapperProps>(
  "div",
  ({ theme }) => `
    display: flex;
    align-items: center;
    padding: ${Number(theme.spacing) * 2}px;
    border-bottom: 1px solid ${theme.palette.divider};
  `
);

const SidebarContentWrapper = styled<"div", SidebarContentWrapperProps>(
  "div",
  ({ theme }) => `
    flex: 1;
    overflow-y: auto;
    padding: ${Number(theme.spacing)}px;
  `
);

const SidebarFooterWrapper = styled<"div", SidebarFooterWrapperProps>(
  "div",
  ({ theme }) => `
    display: flex;
    align-items: center;
    padding: ${Number(theme.spacing) * 2}px;
    border-top: 1px solid ${theme.palette.divider};
  `
);

const SidebarSectionWrapper = styled<"div", SidebarSectionWrapperProps>(
  "div",
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${Number(theme.spacing)}px;
    padding: ${Number(theme.spacing)}px;
  `
);

const SidebarSectionTitle = styled<"div", SidebarSectionTitleProps>(
  "div",
  ({ theme }) => `
    color: ${theme.palette.text.secondary};
    font-size: 0.75rem;
    font-family: ${theme.typography.fontFamily};
    font-weight: 400;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-transform: uppercase;
    padding: ${Number(theme.spacing)}px;
  `
);

const SidebarItemWrapper = styled<"div", SidebarItemWrapperProps>(
  "div",
  ({ selected, disabled, theme }) => `
    display: flex;
    align-items: center;
    gap: ${Number(theme.spacing)}px;
    padding: ${Number(theme.spacing)}px;
    border-radius: ${theme.shape.borderRadius}px;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    opacity: ${disabled ? 0.5 : 1};
    background-color: ${
      selected ? theme.palette.action.selected : "transparent"
    };
    color: ${
      selected ? theme.palette.primary.main : theme.palette.text.primary
    };
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${
        disabled ? "transparent" : theme.palette.action.hover
      };
    }
  `
);

const SidebarItemIcon = styled<"div", SidebarItemIconProps>(
  "div",
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${Number(theme.spacing) * 2}px;
    height: ${Number(theme.spacing) * 2}px;
  `
);

const SidebarItemLabel = styled<"div", SidebarItemLabelProps>(
  "div",
  ({ theme }) => `
    flex: 1;
    font-size: ${theme.typography.body1.fontSize};
    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.body1.fontWeight};
    line-height: ${theme.typography.body1.lineHeight};
  `
);

export const SidebarComponent = ({
  color = "primary",
  variant = "elevation",
  elevation = 1,
  width = 240,
  square = false,
  children,
}: SidebarProps) => {
  const theme = useTheme();

  return (
    <SidebarWrapper
      color={color}
      variant={variant}
      elevation={elevation}
      width={width}
      square={square}
      theme={theme}
    >
      {children}
    </SidebarWrapper>
  );
};

export const SidebarHeaderComponent = ({ children }: SidebarHeaderProps) => {
  const theme = useTheme();

  return <SidebarHeaderWrapper theme={theme}>{children}</SidebarHeaderWrapper>;
};

export const SidebarContentComponent = ({ children }: SidebarContentProps) => {
  const theme = useTheme();

  return (
    <SidebarContentWrapper theme={theme}>{children}</SidebarContentWrapper>
  );
};

export const SidebarFooterComponent = ({ children }: SidebarFooterProps) => {
  const theme = useTheme();

  return <SidebarFooterWrapper theme={theme}>{children}</SidebarFooterWrapper>;
};

export const SidebarSectionComponent = ({
  title,
  children,
}: SidebarSectionProps) => {
  const theme = useTheme();

  return (
    <SidebarSectionWrapper theme={theme}>
      {title && (
        <SidebarSectionTitle theme={theme}>{title}</SidebarSectionTitle>
      )}
      {children}
    </SidebarSectionWrapper>
  );
};

export const SidebarItemComponent = ({
  icon,
  label,
  selected = false,
  disabled = false,
  onClick,
  children,
}: SidebarItemProps) => {
  const theme = useTheme();

  return (
    <SidebarItemWrapper
      selected={selected}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      theme={theme}
    >
      {icon && <SidebarItemIcon theme={theme}>{icon}</SidebarItemIcon>}
      <SidebarItemLabel theme={theme}>{label}</SidebarItemLabel>
      {children}
    </SidebarItemWrapper>
  );
};

export const Sidebar = {
  Root: SidebarComponent,
  Header: SidebarHeaderComponent,
  Content: SidebarContentComponent,
  Footer: SidebarFooterComponent,
  Section: SidebarSectionComponent,
  Item: SidebarItemComponent,
};
