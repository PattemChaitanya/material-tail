import React from "react";
import styles from "./Flex.module.css";
import { cp } from "../../../lib/utils";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction = "row", justify = "flex-start", align = "stretch", wrap = "nowrap", gap, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cp(styles.flex, className)}
        data-direction={direction}
        data-justify={justify}
        data-align={align}
        data-wrap={wrap}
        style={{ gap, ...style }}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";
