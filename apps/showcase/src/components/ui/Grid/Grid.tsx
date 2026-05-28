import React from "react";
import styles from "./Grid.module.css";
import { cp } from "../../../lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  xs?: number | boolean | "auto";
  sm?: number | boolean | "auto";
  md?: number | boolean | "auto";
  lg?: number | boolean | "auto";
  xl?: number | boolean | "auto";
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, container, item, spacing = 0, xs, sm, md, lg, xl, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cp(
          styles.grid,
          container && styles.container,
          item && styles.item,
          className
        )}
        data-spacing={container ? spacing : undefined}
        data-xs={xs}
        data-sm={sm}
        data-md={md}
        data-lg={lg}
        data-xl={xl}
        style={style}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";
