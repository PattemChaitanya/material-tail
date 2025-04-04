import React from "react";
import styled from "../../utils/styled";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";

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

interface CardStyledProps {
  theme: Theme;
  $color?: CardColor;
  $variant?: CardVariant;
  $elevation?: number;
  $square?: boolean;
}

const CardWrapper = styled.div<CardStyledProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }: CardStyledProps) =>
    theme.palette.background.paper};
  border-radius: ${({ $square, theme }: CardStyledProps) =>
    $square ? 0 : theme.shape.borderRadius}px;
  border: ${({ $variant, $color, theme }: CardStyledProps) =>
    $variant === "outlined"
      ? `1px solid ${theme.palette[$color || "primary"].main}`
      : "none"};
  box-shadow: ${({ $variant, $elevation, theme }: CardStyledProps) =>
    $variant === "elevation" ? theme.shadows[$elevation || 1] : "none"};
  overflow: hidden;
`;

interface CardHeaderStyledProps {
  theme: Theme;
}

const CardHeaderWrapper = styled.div<CardHeaderStyledProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }: CardHeaderStyledProps) => theme.spacing.getSpacing(2)};
`;

interface CardHeaderAvatarStyledProps {
  theme: Theme;
}

const CardHeaderAvatar = styled.div<CardHeaderAvatarStyledProps>`
  display: flex;
  flex: 0 0 auto;
  margin-right: ${({ theme }: CardHeaderAvatarStyledProps) =>
    theme.spacing.getSpacing(2)};
`;

interface CardHeaderContentStyledProps {
  theme: Theme;
}

const CardHeaderContent = styled.div<CardHeaderContentStyledProps>`
  flex: 1 1 auto;
`;

interface CardHeaderTitleStyledProps {
  theme: Theme;
  $disableTypography?: boolean;
}

const CardHeaderTitle = styled.div<CardHeaderTitleStyledProps>`
  color: ${({ theme }: CardHeaderTitleStyledProps) =>
    theme.palette.text.primary};
  font-size: ${({ $disableTypography, theme }: CardHeaderTitleStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.h3.fontSize};
  font-family: ${({ $disableTypography, theme }: CardHeaderTitleStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.fontFamily};
  font-weight: ${({ $disableTypography, theme }: CardHeaderTitleStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.h3.fontWeight};
  line-height: ${({ $disableTypography, theme }: CardHeaderTitleStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.h3.lineHeight};
  letter-spacing: ${({
    $disableTypography,
    theme,
  }: CardHeaderTitleStyledProps) => ($disableTypography ? "inherit" : "0em")};
`;

interface CardHeaderSubheaderStyledProps {
  theme: Theme;
  $disableTypography?: boolean;
}

const CardHeaderSubheader = styled.div<CardHeaderSubheaderStyledProps>`
  color: ${({ theme }: CardHeaderSubheaderStyledProps) =>
    theme.palette.text.secondary};
  font-size: ${({
    $disableTypography,
    theme,
  }: CardHeaderSubheaderStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.body2.fontSize};
  font-family: ${({
    $disableTypography,
    theme,
  }: CardHeaderSubheaderStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.fontFamily};
  font-weight: ${({
    $disableTypography,
    theme,
  }: CardHeaderSubheaderStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.body2.fontWeight};
  line-height: ${({
    $disableTypography,
    theme,
  }: CardHeaderSubheaderStyledProps) =>
    $disableTypography ? "inherit" : theme.typography.body2.lineHeight};
  letter-spacing: ${({
    $disableTypography,
    theme,
  }: CardHeaderSubheaderStyledProps) =>
    $disableTypography ? "inherit" : "0.01071em"};
  margin-top: ${({ theme }: CardHeaderSubheaderStyledProps) =>
    theme.spacing.getSpacing(0.5)};
`;

interface CardHeaderActionStyledProps {
  theme: Theme;
}

const CardHeaderAction = styled.div<CardHeaderActionStyledProps>`
  flex: 0 0 auto;
  padding: ${({ theme }: CardHeaderActionStyledProps) =>
    theme.spacing.getSpacing(1)};
  margin: ${({ theme }: CardHeaderActionStyledProps) =>
    `-${theme.spacing.getSpacing(1)}`};
`;

interface CardMediaWrapperStyledProps {
  theme: Theme;
  $height?: number | string;
}

const CardMediaWrapper = styled.div<CardMediaWrapperStyledProps>`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${({ theme }: CardMediaWrapperStyledProps) =>
    theme.palette.background.default};
  height: ${({ $height }: CardMediaWrapperStyledProps) =>
    typeof $height === "number" ? `${$height}px` : $height || "194px"};
`;

interface CardMediaImageStyledProps {
  theme: Theme;
}

const CardMediaImage = styled.img<CardMediaImageStyledProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface CardContentWrapperStyledProps {
  theme: Theme;
}

const CardContentWrapper = styled.div<CardContentWrapperStyledProps>`
  padding: ${({ theme }: CardContentWrapperStyledProps) =>
    theme.spacing.getSpacing(2)};
  &:last-child {
    padding-bottom: ${({ theme }: CardContentWrapperStyledProps) =>
      theme.spacing.getSpacing(2)};
  }
`;

interface CardActionsWrapperStyledProps {
  theme: Theme;
  $disableSpacing?: boolean;
}

const CardActionsWrapper = styled.div<CardActionsWrapperStyledProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }: CardActionsWrapperStyledProps) =>
    theme.spacing.getSpacing(1)};
  gap: ${({ $disableSpacing, theme }: CardActionsWrapperStyledProps) =>
    $disableSpacing ? 0 : theme.spacing.getSpacing(1)};
`;

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
      theme={theme}
      $color={color}
      $variant={variant}
      $elevation={elevation}
      $square={square}
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
          <CardHeaderTitle theme={theme} $disableTypography={disableTypography}>
            {title}
          </CardHeaderTitle>
        )}
        {subheader && (
          <CardHeaderSubheader
            theme={theme}
            $disableTypography={disableTypography}
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
        theme={theme}
        $height={height}
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
    <CardActionsWrapper theme={theme} $disableSpacing={disableSpacing}>
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
