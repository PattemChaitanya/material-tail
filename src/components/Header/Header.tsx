import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import { styled } from "../../utils/styled";

export type HeaderColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type HeaderVariant = "elevation" | "outlined";

export interface HeaderProps {
  color?: HeaderColor;
  variant?: HeaderVariant;
  elevation?: number;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  square?: boolean;
  children?: React.ReactNode;
}

export interface HeaderToolbarProps {
  disableGutters?: boolean;
  variant?: "regular" | "dense";
  children?: React.ReactNode;
}

export interface HeaderBrandProps {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export interface HeaderNavProps {
  children?: React.ReactNode;
}

export interface HeaderActionsProps {
  children?: React.ReactNode;
}

interface StyledProps {
  theme: Theme;
}

interface HeaderWrapperProps {
  color?: HeaderColor;
  variant?: HeaderVariant;
  elevation?: number;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  square?: boolean;
  theme: Theme;
}

const HeaderWrapper = styled<"header", HeaderWrapperProps>(
  "header",
  (props) => `
  display: flex;
  flex-direction: column;
  width: 100%;
  position: ${props.position || "static"};
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props.theme.zIndex.appBar};
  background-color: ${props.theme.palette.background.paper};
  color: ${props.theme.palette.text.primary};
  border-radius: ${props.square ? 0 : props.theme.shape.borderRadius}px;
  border: ${
    props.variant === "outlined"
      ? `1px solid ${props.theme.palette[props.color || "primary"].main}`
      : "none"
  };
  box-shadow: ${
    props.variant === "elevation"
      ? props.theme.shadows[props.elevation || 1]
      : "none"
  };
`
);

interface HeaderToolbarWrapperProps {
  disableGutters?: boolean;
  variant?: "regular" | "dense";
  theme: Theme;
}

const HeaderToolbarWrapper = styled<"div", HeaderToolbarWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${
    props.variant === "dense"
      ? props.theme.spacing.getSpacing(6)
      : props.theme.spacing.getSpacing(7)
  }px;
  padding-left: ${
    props.disableGutters ? 0 : props.theme.spacing.getSpacing(2)
  }px;
  padding-right: ${
    props.disableGutters ? 0 : props.theme.spacing.getSpacing(2)
  }px;
`
);

interface HeaderBrandWrapperProps {
  theme: Theme;
}

const HeaderBrandWrapper = styled<"div", HeaderBrandWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  gap: ${props.theme.spacing.getSpacing(1)}px;
`
);

interface HeaderLogoProps {
  theme: Theme;
}

const HeaderLogo = styled<"div", HeaderLogoProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
`
);

interface HeaderTitleProps {
  theme: Theme;
}

const HeaderTitle = styled<"div", HeaderTitleProps>(
  "div",
  (props) => `
  color: ${props.theme.palette.text.primary};
  font-size: ${props.theme.typography.body1.fontSize};
  font-family: ${props.theme.typography.fontFamily};
  font-weight: ${props.theme.typography.body1.fontWeight};
  line-height: ${props.theme.typography.body1.lineHeight};
`
);

interface HeaderNavWrapperProps {
  theme: Theme;
}

const HeaderNavWrapper = styled<"nav", HeaderNavWrapperProps>(
  "nav",
  (props) => `
  display: flex;
  align-items: center;
  gap: ${props.theme.spacing.getSpacing(1)};
`
);

interface HeaderActionsWrapperProps {
  theme: Theme;
}

const HeaderActionsWrapper = styled<"div", HeaderActionsWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  gap: ${props.theme.spacing.getSpacing(1)};
`
);

export const HeaderComponent = ({
  color = "primary",
  variant = "elevation",
  elevation = 1,
  position = "static",
  square = false,
  children,
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <HeaderWrapper
      color={color}
      variant={variant}
      elevation={elevation}
      position={position}
      square={square}
      theme={theme}
    >
      {children}
    </HeaderWrapper>
  );
};

export const HeaderToolbarComponent = ({
  disableGutters = false,
  variant = "regular",
  children,
}: HeaderToolbarProps) => {
  const theme = useTheme();

  return (
    <HeaderToolbarWrapper
      disableGutters={disableGutters}
      variant={variant}
      theme={theme}
    >
      {children}
    </HeaderToolbarWrapper>
  );
};

export const HeaderBrandComponent = ({
  logo,
  title,
  children,
}: HeaderBrandProps) => {
  const theme = useTheme();

  return (
    <HeaderBrandWrapper theme={theme}>
      {logo && <HeaderLogo theme={theme}>{logo}</HeaderLogo>}
      {title && <HeaderTitle theme={theme}>{title}</HeaderTitle>}
      {children}
    </HeaderBrandWrapper>
  );
};

export const HeaderNavComponent = ({ children }: HeaderNavProps) => {
  const theme = useTheme();

  return <HeaderNavWrapper theme={theme}>{children}</HeaderNavWrapper>;
};

export const HeaderActionsComponent = ({ children }: HeaderActionsProps) => {
  const theme = useTheme();

  return <HeaderActionsWrapper theme={theme}>{children}</HeaderActionsWrapper>;
};

export const Header = {
  Root: HeaderComponent,
  Toolbar: HeaderToolbarComponent,
  Brand: HeaderBrandComponent,
  Nav: HeaderNavComponent,
  Actions: HeaderActionsComponent,
};
