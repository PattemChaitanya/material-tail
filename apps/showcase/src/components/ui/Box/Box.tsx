import React from "react";
import styles from "./Box.module.css";
import { cp } from "../../../lib/utils";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ className, component: Component = "div", ...props }, ref) => {
    return <Component ref={ref} className={cp(styles.box, className)} {...props} />;
  }
);
Box.displayName = "Box";
