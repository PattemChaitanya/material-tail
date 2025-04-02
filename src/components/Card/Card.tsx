import React from "react";
import { styled } from "../../utils/styled";
import { useTheme } from "../../theme";

export type CardColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type CardVariant = "elevation" | "outlined";

export interface CardProps {
  color?: CardColor;
  variant?: CardVariant;
  elevation?: number;
  square?: boolean;
  children?: React.ReactNode;
}

export interface CardHeaderProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  disableTypography?: boolean;
}

export interface CardMediaProps {
  image?: string;
  component?: React.ElementType;
  height?: number | string;
  children?: React.ReactNode;
}

export interface CardContentProps {
  children?: React.ReactNode;
}

export interface CardActionsProps {
  disableSpacing?: boolean;
  children?: React.ReactNode;
}

interface CardWrapperProps {
  color?: CardColor;
  variant?: CardVariant;
  elevation?: number;
  square?: boolean;
  theme: any;
}

const CardWrapper = styled<"div", CardWrapperProps>(
  "div",
  (props) => `
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${props.theme.palette.background.paper};
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
  overflow: hidden;
`
);

interface CardHeaderWrapperProps {
  theme: any;
}

const CardHeaderWrapper = styled<"div", CardHeaderWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  padding: ${props.theme.spacing(2)}px;
`
);

interface CardHeaderAvatarProps {
  theme: any;
}

const CardHeaderAvatar = styled<"div", CardHeaderAvatarProps>(
  "div",
  (props) => `
  display: flex;
  flex: 0 0 auto;
  margin-right: ${props.theme.spacing(2)}px;
`
);

interface CardHeaderContentProps {
  theme: any;
}

const CardHeaderContent = styled<"div", CardHeaderContentProps>(
  "div",
  (props) => `
  flex: 1 1 auto;
`
);

interface CardHeaderTitleProps {
  disableTypography?: boolean;
  theme: any;
}

const CardHeaderTitle = styled<"div", CardHeaderTitleProps>(
  "div",
  (props) => `
  color: ${props.theme.palette.text.primary};
  font-size: ${
    props.disableTypography ? "inherit" : props.theme.typography.h6.fontSize
  };
  font-family: ${
    props.disableTypography ? "inherit" : props.theme.typography.h6.fontFamily
  };
  font-weight: ${
    props.disableTypography ? "inherit" : props.theme.typography.h6.fontWeight
  };
  line-height: ${
    props.disableTypography ? "inherit" : props.theme.typography.h6.lineHeight
  };
  letter-spacing: ${
    props.disableTypography
      ? "inherit"
      : props.theme.typography.h6.letterSpacing
  };
`
);

interface CardHeaderSubheaderProps {
  disableTypography?: boolean;
  theme: any;
}

const CardHeaderSubheader = styled<"div", CardHeaderSubheaderProps>(
  "div",
  (props) => `
  color: ${props.theme.palette.text.secondary};
  font-size: ${
    props.disableTypography ? "inherit" : props.theme.typography.body2.fontSize
  };
  font-family: ${
    props.disableTypography
      ? "inherit"
      : props.theme.typography.body2.fontFamily
  };
  font-weight: ${
    props.disableTypography
      ? "inherit"
      : props.theme.typography.body2.fontWeight
  };
  line-height: ${
    props.disableTypography
      ? "inherit"
      : props.theme.typography.body2.lineHeight
  };
  letter-spacing: ${
    props.disableTypography
      ? "inherit"
      : props.theme.typography.body2.letterSpacing
  };
  margin-top: ${props.theme.spacing(0.5)}px;
`
);

interface CardHeaderActionProps {
  theme: any;
}

const CardHeaderAction = styled<"div", CardHeaderActionProps>(
  "div",
  (props) => `
  flex: 0 0 auto;
  padding: ${props.theme.spacing(1)}px;
  margin: ${-props.theme.spacing(1)}px;
`
);

interface CardMediaWrapperProps {
  height?: number | string;
  theme: any;
}

const CardMediaWrapper = styled<"div", CardMediaWrapperProps>(
  "div",
  (props) => `
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props.theme.palette.background.default};
  height: ${
    typeof props.height === "number"
      ? `${props.height}px`
      : props.height || "194px"
  };
`
);

interface CardMediaImageProps {
  theme: any;
}

const CardMediaImage = styled<"img", CardMediaImageProps>(
  "img",
  (props) => `
  width: 100%;
  height: 100%;
  object-fit: cover;
`
);

interface CardContentWrapperProps {
  theme: any;
}

const CardContentWrapper = styled<"div", CardContentWrapperProps>(
  "div",
  (props) => `
  padding: ${props.theme.spacing(2)}px;
  &:last-child {
    padding-bottom: ${props.theme.spacing(2)}px;
  }
`
);

interface CardActionsWrapperProps {
  disableSpacing?: boolean;
  theme: any;
}

const CardActionsWrapper = styled<"div", CardActionsWrapperProps>(
  "div",
  (props) => `
  display: flex;
  align-items: center;
  padding: ${props.theme.spacing(1)}px;
  gap: ${props.disableSpacing ? 0 : props.theme.spacing(1)}px;
`
);

export const CardComponent = ({
  color = "primary",
  variant = "elevation",
  elevation = 1,
  square = false,
  children,
}: CardProps) => {
  const theme = useTheme();

  return (
    <CardWrapper
      color={color}
      variant={variant}
      elevation={elevation}
      square={square}
      theme={theme}
    >
      {children}
    </CardWrapper>
  );
};

export const CardHeaderComponent = ({
  avatar,
  title,
  subheader,
  action,
  disableTypography = false,
}: CardHeaderProps) => {
  const theme = useTheme();

  return (
    <CardHeaderWrapper theme={theme}>
      {avatar && <CardHeaderAvatar theme={theme}>{avatar}</CardHeaderAvatar>}
      <CardHeaderContent theme={theme}>
        {title && (
          <CardHeaderTitle disableTypography={disableTypography} theme={theme}>
            {title}
          </CardHeaderTitle>
        )}
        {subheader && (
          <CardHeaderSubheader
            disableTypography={disableTypography}
            theme={theme}
          >
            {subheader}
          </CardHeaderSubheader>
        )}
      </CardHeaderContent>
      {action && <CardHeaderAction theme={theme}>{action}</CardHeaderAction>}
    </CardHeaderWrapper>
  );
};

export const CardMediaComponent = ({
  image,
  component: Component = "div",
  height,
  children,
}: CardMediaProps) => {
  const theme = useTheme();

  if (Component === "div") {
    return (
      <CardMediaWrapper
        height={height}
        theme={theme}
        style={
          image
            ? {
                backgroundImage: `url(${image})`,
              }
            : undefined
        }
      >
        {!image && children}
      </CardMediaWrapper>
    );
  }

  return (
    <Component
      style={{
        display: "block",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: theme.palette.background.default,
        height: typeof height === "number" ? `${height}px` : height || "194px",
        ...(image ? { backgroundImage: `url(${image})` } : {}),
      }}
    >
      {!image && children}
    </Component>
  );
};

export const CardContentComponent = ({ children }: CardContentProps) => {
  const theme = useTheme();

  return <CardContentWrapper theme={theme}>{children}</CardContentWrapper>;
};

export const CardActionsComponent = ({
  disableSpacing = false,
  children,
}: CardActionsProps) => {
  const theme = useTheme();

  return (
    <CardActionsWrapper disableSpacing={disableSpacing} theme={theme}>
      {children}
    </CardActionsWrapper>
  );
};

export const Card = {
  Root: CardComponent,
  Header: CardHeaderComponent,
  Media: CardMediaComponent,
  Content: CardContentComponent,
  Actions: CardActionsComponent,
};
