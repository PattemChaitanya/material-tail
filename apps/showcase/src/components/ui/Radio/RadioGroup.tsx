import React from "react";
import styles from "./Radio.module.css";
import { cp } from "../../../lib/utils";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  row?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value,
      defaultValue,
      onChange,
      row = false,
      children,
      ...props
    },
    ref
  ) => {
    // We clone the children to inject the name, onChange, and value/checked props
    // if this is being used as a controlled or uncontrolled group.
    
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement<any>;
        return React.cloneElement(childElement, {
          name: name,
          onChange: handleChange,
          checked: childElement.props.value === currentValue,
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cp(styles.group, className)}
        data-row={row || undefined}
        role="radiogroup"
        {...props}
      >
        {childrenWithProps}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
