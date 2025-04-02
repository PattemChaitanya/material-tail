import React, {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { css } from "@emotion/react";

type HTMLTag = keyof React.JSX.IntrinsicElements;
type StyledComponent<
  T extends ComponentType<any> | HTMLTag,
  P = {}
> = ForwardRefExoticComponent<
  Omit<React.ComponentProps<T>, "ref"> & P & RefAttributes<HTMLElement>
>;

type StyledFunction = {
  <T extends ComponentType<any> | HTMLTag, P = {}>(
    tag: T,
    styles: string | ((props: P) => string)
  ): StyledComponent<T, P>;
};

/**
 * Creates a styled component with the given styles
 * @param tag The HTML element or React component to style
 * @param styles The styles to apply to the component
 * @returns A styled React component
 */
export const styled: StyledFunction = (tag: any, styles: any) => {
  return React.forwardRef((props: any, ref: any) => {
    const { theme, ...rest } = props;

    // Handle function or string styles
    const styleString = typeof styles === "function" ? styles(props) : styles;

    // Create CSS-in-JS styles
    const cssStyles = css`
      ${styleString}
    `;

    // Create the component with the styles
    return React.createElement(tag, {
      ref,
      css: cssStyles,
      ...rest,
    });
  });
};

// Add all HTML elements as properties of styled
Object.keys(React.createElement("div", null)).forEach((tag) => {
  if (typeof tag === "string") {
    (styled as any)[tag] = (styles: string | ((props: any) => string)) =>
      styled(tag as HTMLTag, styles);
  }
});
