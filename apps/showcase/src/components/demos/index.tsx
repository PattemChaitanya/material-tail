import React from "react";
// @ts-ignore
import { Button } from "../ui/Button";
// @ts-ignore
import { Input } from "../ui/Input";
// @ts-ignore
import { Alert } from "../ui/Alert";
// @ts-ignore
import { Select } from "../ui/Select";
// @ts-ignore
import { Switch } from "../ui/Switch";
// @ts-ignore
import { Flex } from "../ui/Flex";

export interface DemoControl {
  name: string;
  type: 'select';
  options: string[];
  defaultValue: string;
}

export interface DemoConfig {
  controls: DemoControl[];
  component: React.FC<any>;
}

export const DemoRegistry: Record<string, DemoConfig> = {
  button: {
    controls: [
      { name: 'variant', type: 'select', options: ['default', 'secondary', 'ghost', 'link', 'text', 'outlined'], defaultValue: 'default' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'], defaultValue: 'primary' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      const disabled = props.disabled === 'true';
      const fullWidth = props.fullWidth === 'true';
      return (
        <Button 
          variant={props.variant} 
          size={props.size} 
          color={props.color} 
          disabled={disabled}
          fullWidth={fullWidth}
        >
          Primary Action
        </Button>
      );
    }
  },
  input: {
    controls: [
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Input 
        placeholder="Enter something..." 
        disabled={props.disabled === 'true'} 
        error={props.error === 'true'}
      />
    )
  },
  alert: {
    controls: [
      { name: 'variant', type: 'select', options: ['default', 'filled', 'outlined'], defaultValue: 'default' },
      { name: 'severity', type: 'select', options: ['info', 'success', 'warning', 'error'], defaultValue: 'info' }
    ],
    component: (props: any) => (
      <Alert variant={props.variant} severity={props.severity}>
        This is an alert demonstrating the {props.severity} severity.
      </Alert>
    )
  },
  select: {
    controls: [
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Select placeholder="Choose an option" disabled={props.disabled === 'true'} error={props.error === 'true'} style={{ width: "200px" }}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    )
  },
  switch: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error'], defaultValue: 'primary' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Flex gap={12} align="center">
        <Switch color={props.color} disabled={props.disabled === 'true'} />
        <span style={{ color: "var(--text-primary)" }}>Toggle me</span>
      </Flex>
    )
  }
};
