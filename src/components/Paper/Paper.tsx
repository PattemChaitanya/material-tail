import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import { styled } from "../../utils/styled";

export interface PaperProps {
  elevation?: number;
  children: React.ReactNode;
}

interface StyledPaperProps {
  elevation?: number;
  theme: Theme;
}

const StyledPaper = styled<"div", StyledPaperProps>(
  "div",
  (props) => `
  background-color: ${props.theme.palette.background.paper};
  border-radius: ${props.theme.shape.borderRadius}px;
  box-shadow: ${props.theme.shadows[props.elevation || 0]};
  padding: ${props.theme.spacing.getSpacing(2)}px;
`
);

export const Paper: React.FC<PaperProps> = ({ elevation = 0, children }) => {
  const theme = useTheme();
  return (
    <StyledPaper elevation={elevation} theme={theme}>
      {children}
    </StyledPaper>
  );
};
