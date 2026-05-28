import React from "react";
import styles from "./Pagination.module.css";
import { cp } from "../../../lib/utils";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  count?: number; // total pages
  page?: number;  // current page (1-based)
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  color?: "primary" | "secondary" | "standard";
  variant?: "text" | "outlined";
  shape?: "circular" | "rounded";
  disabled?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      count = 1,
      page = 1,
      onChange,
      color = "standard",
      variant = "text",
      shape = "circular",
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Generate array of page numbers
    let itemList: (number | string)[] = [];
    
    if (count <= 7) {
      itemList = Array.from({ length: count }, (_, i) => i + 1);
    } else {
      if (page <= 3) {
        itemList = [1, 2, 3, 4, 5, '...', count];
      } else if (page >= count - 2) {
        itemList = [1, '...', count - 4, count - 3, count - 2, count - 1, count];
      } else {
        itemList = [1, '...', page - 1, page, page + 1, '...', count];
      }
    }

    const handleClick = (e: React.MouseEvent, newPage: number) => {
      if (!disabled && onChange && newPage >= 1 && newPage <= count && newPage !== page) {
        onChange(e as any, newPage);
      }
    };

    return (
      <nav
        ref={ref}
        aria-label="pagination navigation"
        className={cp(styles.root, className)}
        {...props}
      >
        <ul className={styles.ul}>
          <li>
            <button
              type="button"
              className={cp(styles.item, styles.previousNext)}
              disabled={disabled || page <= 1}
              onClick={(e) => handleClick(e, page - 1)}
              data-variant={variant}
              data-shape={shape}
              aria-label="Go to previous page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </li>
          
          {itemList.map((item, index) => {
            if (item === '...') {
              return (
                <li key={`ellipsis-${index}`}>
                  <div className={styles.ellipsis}>...</div>
                </li>
              );
            }
            
            const isSelected = item === page;
            return (
              <li key={item}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-current={isSelected ? "true" : undefined}
                  className={styles.item}
                  data-variant={variant}
                  data-color={color}
                  data-shape={shape}
                  onClick={(e) => handleClick(e, item as number)}
                  aria-label={`Go to page ${item}`}
                >
                  {item}
                </button>
              </li>
            );
          })}

          <li>
            <button
              type="button"
              className={cp(styles.item, styles.previousNext)}
              disabled={disabled || page >= count}
              onClick={(e) => handleClick(e, page + 1)}
              data-variant={variant}
              data-shape={shape}
              aria-label="Go to next page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";
