import React, { Children } from "react";
import styles from "./Breadcrumbs.module.css";
import { cp } from "../../../lib/utils";

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator = "/", maxItems = 8, children, ...props }, ref) => {
    const allChildren = Children.toArray(children).filter((child) => React.isValidElement(child));
    
    let renderChildren = allChildren;
    if (allChildren.length > maxItems) {
      renderChildren = [
        allChildren[0],
        <span key="ellipsis" className={styles.ellipsis}>...</span>,
        ...allChildren.slice(allChildren.length - (maxItems - 1))
      ];
    }

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cp(styles.root, className)}
        {...props}
      >
        <ol className={styles.ol}>
          {renderChildren.map((child, index) => {
            const isLast = index === renderChildren.length - 1;
            return (
              <li className={styles.li} key={`breadcrumb-${index}`}>
                {React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, {
                   'aria-current': isLast ? 'page' : undefined,
                   className: cp((child as React.ReactElement<any>).props.className, isLast ? styles.lastItem : styles.item)
                }) : child}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";
