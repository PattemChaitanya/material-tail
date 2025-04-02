import React, { createContext, useContext } from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import { styled } from "../../utils/styled";

export type ListColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type ListVariant = "text" | "outlined" | "contained";

export interface ListProps {
  color?: ListColor;
  variant?: ListVariant;
  dense?: boolean;
  disablePadding?: boolean;
  children?: React.ReactNode;
}

export interface ListItemProps {
  button?: boolean;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface ListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  inset?: boolean;
}

export interface ListItemIconProps {
  children?: React.ReactNode;
}

export interface ListItemAvatarProps {
  children?: React.ReactNode;
}

export interface ListSubheaderProps {
  children?: React.ReactNode;
  inset?: boolean;
}

const ListContext = createContext<{
  color?: ListColor;
  variant?: ListVariant;
  dense?: boolean;
  disablePadding?: boolean;
}>({});

interface ListWrapperProps {
  color?: ListColor;
  variant?: ListVariant;
  dense?: boolean;
  disablePadding?: boolean;
  theme: Theme;
}

const ListWrapper = styled<"ul", ListWrapperProps>(
  "ul",
  (props) => `
  margin: 0;
  padding: ${
    props.dense || props.disablePadding ? 0 : props.theme.spacing.getSpacing(1)
  }px;
  list-style: none;
  background-color: ${
    props.variant === "contained"
      ? props.theme.palette[props.color || "primary"].main
      : props.theme.palette.background.paper
  };
  border: ${
    props.variant === "outlined"
      ? `1px solid ${props.theme.palette[props.color || "primary"].main}`
      : "none"
  };
  border-radius: ${props.theme.shape.borderRadius}px;
`
);

interface ListItemWrapperProps {
  button?: boolean;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
  dense?: boolean;
  disablePadding?: boolean;
  color?: ListColor;
  variant?: ListVariant;
  theme: Theme;
}

const ListItemWrapper = styled<"li", ListItemWrapperProps>(
  "li",
  (props) => `
  display: flex;
  align-items: center;
  padding: ${
    props.dense
      ? props.theme.spacing.getSpacing(0.5)
      : props.disablePadding
      ? 0
      : props.theme.spacing.getSpacing(1)
  }px;
  cursor: ${
    props.disabled ? "not-allowed" : props.button ? "pointer" : "default"
  };
  opacity: ${props.disabled ? 0.5 : 1};
  background-color: ${
    props.selected
      ? props.theme.palette[props.color || "primary"].light
      : "transparent"
  };
  border-bottom: ${
    props.divider ? `1px solid ${props.theme.palette.divider}` : "none"
  };

  &:hover:not(:disabled) {
    background-color: ${
      props.selected
        ? props.theme.palette[props.color || "primary"].light
        : props.theme.palette.action.hover
    };
  }
`
);

interface ListItemTextWrapperProps {
  inset?: boolean;
  dense?: boolean;
  disablePadding?: boolean;
  theme: Theme;
}

const ListItemTextWrapper = styled<"div", ListItemTextWrapperProps>(
  "div",
  (props) => `
  flex: 1;
  padding: ${(() => {
    if (props.inset) {
      return props.dense
        ? props.theme.spacing.getSpacing(0.5)
        : props.theme.spacing.getSpacing(1);
    }
    return props.disablePadding
      ? 0
      : props.dense
      ? props.theme.spacing.getSpacing(0.5)
      : props.theme.spacing.getSpacing(1);
  })()}px;
`
);

interface ListItemPrimaryTextProps {
  color?: ListColor;
  variant?: ListVariant;
  theme: Theme;
}

const ListItemPrimaryText = styled<"div", ListItemPrimaryTextProps>(
  "div",
  (props) => `
  color: ${
    props.variant === "contained"
      ? props.theme.palette.common.white
      : props.theme.palette.text.primary
  };
  font-size: 1rem;
  line-height: 1.5;
`
);

interface ListItemSecondaryTextProps {
  color?: ListColor;
  variant?: ListVariant;
  theme: Theme;
}

const ListItemSecondaryText = styled<"div", ListItemSecondaryTextProps>(
  "div",
  (props) => `
  color: ${
    props.variant === "contained"
      ? props.theme.palette.common.white
      : props.theme.palette.text.secondary
  };
  font-size: 0.875rem;
  line-height: 1.43;
`
);

interface ListItemIconWrapperProps {
  dense?: boolean;
  disablePadding?: boolean;
  theme: Theme;
}

const ListItemIconWrapper = styled<"div", ListItemIconWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  padding: ${
    props.dense || props.disablePadding ? 0 : props.theme.spacing.getSpacing(1)
  }px;
  color: ${props.theme.palette.action.active};
`
);

interface ListItemAvatarWrapperProps {
  dense?: boolean;
  disablePadding?: boolean;
  theme: Theme;
}

const ListItemAvatarWrapper = styled<"div", ListItemAvatarWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  padding: ${
    props.dense || props.disablePadding ? 0 : props.theme.spacing.getSpacing(1)
  }px;
`
);

interface ListSubheaderWrapperProps {
  inset?: boolean;
  dense?: boolean;
  disablePadding?: boolean;
  color?: ListColor;
  variant?: ListVariant;
  theme: Theme;
}

const ListSubheaderWrapper = styled<"div", ListSubheaderWrapperProps>(
  "div",
  (props) => `
  padding: ${(() => {
    if (props.inset) {
      return props.dense
        ? props.theme.spacing.getSpacing(0.5)
        : props.theme.spacing.getSpacing(1);
    }
    return props.disablePadding
      ? 0
      : props.dense
      ? props.theme.spacing.getSpacing(0.5)
      : props.theme.spacing.getSpacing(1);
  })()}px;
  color: ${
    props.variant === "contained"
      ? props.theme.palette.common.white
      : props.theme.palette.text.secondary
  };
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.57;
`
);

export const ListComponent = ({
  color = "primary",
  variant = "text",
  dense = false,
  disablePadding = false,
  children,
}: ListProps) => {
  const theme = useTheme();

  return (
    <ListContext.Provider value={{ color, variant, dense, disablePadding }}>
      <ListWrapper
        color={color}
        variant={variant}
        dense={dense}
        disablePadding={disablePadding}
        theme={theme}
      >
        {children}
      </ListWrapper>
    </ListContext.Provider>
  );
};

export const ListItemComponent = ({
  button = false,
  selected = false,
  disabled = false,
  divider = false,
  children,
  onClick,
}: ListItemProps) => {
  const theme = useTheme();
  const context = useContext(ListContext);

  return (
    <ListItemWrapper
      button={button}
      selected={selected}
      disabled={disabled}
      divider={divider}
      dense={context.dense}
      disablePadding={context.disablePadding}
      color={context.color}
      variant={context.variant}
      theme={theme}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </ListItemWrapper>
  );
};

export const ListItemTextComponent = ({
  primary,
  secondary,
  inset = false,
}: ListItemTextProps) => {
  const theme = useTheme();
  const context = useContext(ListContext);

  return (
    <ListItemTextWrapper
      inset={inset}
      dense={context.dense}
      disablePadding={context.disablePadding}
      theme={theme}
    >
      {primary && (
        <ListItemPrimaryText
          color={context.color}
          variant={context.variant}
          theme={theme}
        >
          {primary}
        </ListItemPrimaryText>
      )}
      {secondary && (
        <ListItemSecondaryText
          color={context.color}
          variant={context.variant}
          theme={theme}
        >
          {secondary}
        </ListItemSecondaryText>
      )}
    </ListItemTextWrapper>
  );
};

export const ListItemIconComponent = ({ children }: ListItemIconProps) => {
  const theme = useTheme();
  const context = useContext(ListContext);

  return (
    <ListItemIconWrapper
      dense={context.dense}
      disablePadding={context.disablePadding}
      theme={theme}
    >
      {children}
    </ListItemIconWrapper>
  );
};

export const ListItemAvatarComponent = ({ children }: ListItemAvatarProps) => {
  const theme = useTheme();
  const context = useContext(ListContext);

  return (
    <ListItemAvatarWrapper
      dense={context.dense}
      disablePadding={context.disablePadding}
      theme={theme}
    >
      {children}
    </ListItemAvatarWrapper>
  );
};

export const ListSubheaderComponent = ({
  children,
  inset = false,
}: ListSubheaderProps) => {
  const theme = useTheme();
  const context = useContext(ListContext);

  return (
    <ListSubheaderWrapper
      inset={inset}
      dense={context.dense}
      disablePadding={context.disablePadding}
      color={context.color}
      variant={context.variant}
      theme={theme}
    >
      {children}
    </ListSubheaderWrapper>
  );
};

export const List = {
  Root: ListComponent,
  Item: ListItemComponent,
  ItemText: ListItemTextComponent,
  ItemIcon: ListItemIconComponent,
  ItemAvatar: ListItemAvatarComponent,
  Subheader: ListSubheaderComponent,
};
