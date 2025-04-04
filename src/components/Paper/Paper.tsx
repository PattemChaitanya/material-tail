import React from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

export interface PaperProps {
  elevation?: number;
  children: React.ReactNode;
}

interface StyledPaperProps {
  elevation?: number;
  theme: Theme;
}

const StyledPaper = styled.div<StyledPaperProps>`
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  box-shadow: ${(props) => props.theme.shadows[props.elevation || 0]};
  padding: ${(props) => props.theme.spacing.getSpacing(2)}px;
`;

export const Paper: React.FC<PaperProps> = ({ elevation = 0, children }) => {
  const theme = useTheme();
  return (
    <StyledPaper elevation={elevation} theme={theme}>
      {children}
    </StyledPaper>
  );
};
