import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export type SidebarVariant = "permanent" | "persistent" | "temporary";
export type SidebarColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface SidebarProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  width?: number;
  elevation?: number;
}

interface SidebarWrapperProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  open?: boolean;
  width?: number;
  elevation?: number;
  theme: Theme;
}

const StyledSidebarWrapper = styled.div<SidebarWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${(props) => props.width || 240}px;
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: ${(props) => props.theme.shadows[props.elevation || 0]};
  z-index: 1200;
  transition: all 0.2s ease-in-out;

  ${(props) => {
    const width = props.width || 240;
    const transform = props.open ? "0" : `-${width}px`;
    switch (props.variant) {
      case "permanent":
        return "";
      case "persistent":
        return `transform: translateX(${transform});`;
      case "temporary":
        return `
          transform: translateX(${transform});
          position: fixed;
        `;
      default:
        return "";
    }
  }}
`;

export interface SidebarContentProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  theme: Theme;
  children?: React.ReactNode;
}

const StyledSidebarContent = styled.div<SidebarContentProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.getSpacing(2)}px;
`;

export interface SidebarHeaderProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  theme: Theme;
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div<SidebarHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.getSpacing(2)}px;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

export interface SidebarTitleProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  theme: Theme;
  children?: React.ReactNode;
}

const StyledSidebarTitle = styled.div<SidebarTitleProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 1.25rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
`;

export interface SidebarBodyProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  theme: Theme;
  children?: React.ReactNode;
}

const StyledSidebarBody = styled.div<SidebarBodyProps>`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.getSpacing(2)}px;
`;

export interface SidebarFooterProps {
  variant?: SidebarVariant;
  color?: SidebarColor;
  theme: Theme;
  children?: React.ReactNode;
}

const StyledSidebarFooter = styled.div<SidebarFooterProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.getSpacing(2)}px;
  border-top: 1px solid ${(props) => props.theme.palette.divider};
`;

export const Sidebar: React.FC<SidebarProps> = ({
  variant = "permanent",
  color = "primary",
  open = true,
  onClose,
  children,
  width = 240,
  elevation = 0,
}) => {
  const theme = useTheme();

  return (
    <StyledSidebarWrapper
      variant={variant}
      color={color}
      open={open}
      width={width}
      elevation={elevation}
      theme={theme}
    >
      <StyledSidebarContent variant={variant} color={color} theme={theme}>
        {children}
      </StyledSidebarContent>
    </StyledSidebarWrapper>
  );
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  variant,
  color,
  children,
}) => {
  const theme = useTheme();

  return (
    <StyledSidebarHeader variant={variant} color={color} theme={theme}>
      {children}
    </StyledSidebarHeader>
  );
};

export const SidebarTitle: React.FC<SidebarTitleProps> = ({
  variant,
  color,
  children,
}) => {
  const theme = useTheme();

  return (
    <StyledSidebarTitle variant={variant} color={color} theme={theme}>
      {children}
    </StyledSidebarTitle>
  );
};

export const SidebarBody: React.FC<SidebarBodyProps> = ({
  variant,
  color,
  children,
}) => {
  const theme = useTheme();

  return (
    <StyledSidebarBody variant={variant} color={color} theme={theme}>
      {children}
    </StyledSidebarBody>
  );
};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  variant,
  color,
  children,
}) => {
  const theme = useTheme();

  return (
    <StyledSidebarFooter variant={variant} color={color} theme={theme}>
      {children}
    </StyledSidebarFooter>
  );
};
