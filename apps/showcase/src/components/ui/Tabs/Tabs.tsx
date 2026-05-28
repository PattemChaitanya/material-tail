import React, { Children, isValidElement, cloneElement, useState, useRef, useEffect } from "react";
import styles from "./Tabs.module.css";
import { cp } from "../../../lib/utils";

// ==========================================
// Tabs Component
// ==========================================
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: "standard" | "fullWidth";
  color?: "primary" | "secondary";
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, value, onChange, variant = "standard", color = "primary", children, ...props },
    ref
  ) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref || tabsRef) as React.MutableRefObject<HTMLDivElement | null>;
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
      // Calculate indicator position based on the selected tab
      // Using a timeout to ensure DOM layout is complete before measuring
      const timeoutId = setTimeout(() => {
        if (combinedRef.current) {
          const selectedTab = combinedRef.current.querySelector(
            `[role="tab"][aria-selected="true"]`
          ) as HTMLElement;

          if (selectedTab) {
            setIndicatorStyle({
              left: selectedTab.offsetLeft,
              width: selectedTab.offsetWidth,
            });
          }
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }, [value, combinedRef, children]);

    return (
      <div
        ref={combinedRef}
        role="tablist"
        className={cp(styles.tabsRoot, className)}
        data-variant={variant}
        data-color={color}
        {...props}
      >
        <div className={styles.tabsScroller}>
          <div className={styles.tabsFlexContainer}>
            {Children.map(children, (child, index) => {
              if (isValidElement(child)) {
                return cloneElement(child as React.ReactElement<any>, {
                  selected: value === index,
                  onClick: (e: React.SyntheticEvent) => {
                    const element = child as React.ReactElement<any>;
                    if (element.props.disabled) return;
                    if (element.props.onClick) element.props.onClick(e);
                    onChange(e, index);
                  },
                });
              }
              return child;
            })}
          </div>
          <span
            className={styles.indicator}
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

// ==========================================
// Tab Component
// ==========================================
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "top" | "bottom" | "start" | "end";
  selected?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    { className, label, icon, iconPosition = "top", selected, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={selected}
        aria-disabled={disabled}
        tabIndex={selected ? 0 : -1}
        className={cp(styles.tab, className)}
        data-icon-position={iconPosition}
        disabled={disabled}
        {...props}
      >
        {icon && <span className={styles.tabIcon}>{icon}</span>}
        {label}
      </button>
    );
  }
);
Tab.displayName = "Tab";

// ==========================================
// TabPanel Component
// ==========================================
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  index: number;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, value, index, ...props }, ref) => {
    const hidden = value !== index;
    return (
      <div
        ref={ref}
        role="tabpanel"
        hidden={hidden}
        className={cp(styles.tabPanel, className)}
        {...props}
      >
        {!hidden && children}
      </div>
    );
  }
);
TabPanel.displayName = "TabPanel";
