import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";
import { Paper } from "../Paper";

export type MenuVariant = "standard" | "dense";
export type MenuColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface MenuProps {
  variant?: MenuVariant;
  color?: MenuColor;
  open: boolean;
  onClose?: () => void;
  anchorEl?: HTMLElement | null;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  elevation?: number;
  dense?: boolean;
}

export interface MenuItemProps {
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  dense?: boolean;
  divider?: boolean;
  children: React.ReactNode;
}

interface StyledMenuWrapperProps {
  anchorPosition: { top: number; left: number };
  transformOrigin: { vertical: string; horizontal: string };
  theme: Theme;
}

const StyledMenuWrapper = styled.div<StyledMenuWrapperProps>`
  position: fixed;
  top: ${(props) => props.anchorPosition.top}px;
  left: ${(props) => props.anchorPosition.left}px;
  z-index: 1300;
  min-width: 160px;
  max-height: calc(100vh - 96px);
  overflow-y: auto;
  transform-origin: ${(props) => props.transformOrigin.horizontal}
    ${(props) => props.transformOrigin.vertical};
  opacity: 0;
  transform: scale(0.75);
  visibility: hidden;
  transition: all 0.2s ease-in-out;

  &.open {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
`;

interface StyledMenuListProps {
  dense?: boolean;
  theme: Theme;
}

const StyledMenuList = styled.ul<StyledMenuListProps>`
  list-style: none;
  margin: 0;
  padding: ${(props) => (props.dense ? "4px 0" : "8px 0")};
`;

interface StyledMenuItemProps {
  disabled?: boolean;
  selected?: boolean;
  dense?: boolean;
  divider?: boolean;
  theme: Theme;
}

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  text-decoration: none;
  min-height: ${(props) => (props.dense ? "32px" : "48px")};
  padding: ${(props) => (props.dense ? "4px 16px" : "6px 16px")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  user-select: none;
  border-bottom: ${(props) =>
    props.divider ? `1px solid ${props.theme.palette.divider}` : "none"};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.theme.palette.text.primary};
  background-color: ${(props) =>
    props.selected ? props.theme.palette.action.selected : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "transparent" : props.theme.palette.action.hover};
  }
`;

export const MenuComponent: React.FC<MenuProps> = ({
  variant = "standard",
  color = "default",
  open,
  onClose,
  anchorEl,
  children,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "left" },
  elevation = 8,
  dense = false,
}) => {
  const theme = useTheme();
  const [anchorPosition, setAnchorPosition] = React.useState({
    top: 0,
    left: 0,
  });

  React.useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const anchorPosition = {
        top:
          anchorOrigin.vertical === "bottom"
            ? rect.bottom
            : rect.top -
              (transformOrigin.vertical === "bottom" ? rect.height : 0),
        left:
          anchorOrigin.horizontal === "right"
            ? rect.right
            : rect.left -
              (transformOrigin.horizontal === "right" ? rect.width : 0),
      };
      setAnchorPosition(anchorPosition);
    }
  }, [anchorEl, anchorOrigin, transformOrigin]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        onClose &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [open, onClose, anchorEl]);

  return (
    <Paper elevation={elevation}>
      <StyledMenuWrapper
        anchorPosition={anchorPosition}
        transformOrigin={transformOrigin}
        className={open ? "open" : ""}
        role="menu"
        aria-hidden={!open}
        theme={theme}
      >
        <StyledMenuList dense={dense} role="menu" theme={theme}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(
              child as React.ReactElement<MenuItemProps>,
              {
                dense,
              }
            );
          })}
        </StyledMenuList>
      </StyledMenuWrapper>
    </Paper>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  disabled = false,
  selected = false,
  dense = false,
  divider = false,
  children,
}) => {
  const theme = useTheme();

  return (
    <StyledMenuItem
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      selected={selected}
      dense={dense}
      divider={divider}
      theme={theme}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {children}
    </StyledMenuItem>
  );
};

export const Menu = {
  Root: MenuComponent,
  Item: MenuItem,
};
