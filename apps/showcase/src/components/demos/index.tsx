import React, { useState } from "react";
// @ts-ignore
import { Button } from "../ui/Button";
// @ts-ignore
import { Input } from "../ui/Input";
// @ts-ignore
import { Select } from "../ui/Select";
// @ts-ignore
import { Switch } from "../ui/Switch";
// @ts-ignore
import { Flex } from "../ui/Flex";
// @ts-ignore
import { Avatar } from "../ui/Avatar";
// @ts-ignore
import { Badge } from "../ui/Badge";
// @ts-ignore
import { Breadcrumbs } from "../ui/Breadcrumbs";
// @ts-ignore
import { Card, CardContent } from "../ui/Card";
// @ts-ignore
import { Checkbox } from "../ui/Checkbox";
// @ts-ignore
import { Dialog, DialogTitle, DialogContent, DialogActions } from "../ui/Dialog";

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
  avatar: {
    controls: [
      { name: 'variant', type: 'select', options: ['circular', 'rounded', 'square'], defaultValue: 'circular' },
      { name: 'color', type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning'], defaultValue: 'default' }
    ],
    component: (props: any) => (
      <Avatar variant={props.variant} color={props.color} style={{ width: 64, height: 64, fontSize: 24 }}>AB</Avatar>
    )
  },
  badge: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning'], defaultValue: 'error' },
      { name: 'variant', type: 'select', options: ['standard', 'dot'], defaultValue: 'standard' },
      { name: 'invisible', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Badge color={props.color} variant={props.variant} invisible={props.invisible === 'true'} badgeContent={props.variant === 'dot' ? undefined : 4}>
        <Avatar variant="rounded" style={{ width: 48, height: 48, background: "rgba(255,255,255,0.1)" }} />
      </Badge>
    )
  },
  breadcrumb: {
    controls: [
      { name: 'separator', type: 'select', options: ['/', '>', '-'], defaultValue: '/' }
    ],
    component: (props: any) => (
      <Breadcrumbs separator={props.separator}>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Components</a>
        <span style={{ color: 'var(--text-primary)' }}>Breadcrumb</span>
      </Breadcrumbs>
    )
  },
  button: {
    controls: [
      { name: 'variant', type: 'select', options: ['contained', 'secondary', 'ghost', 'link', 'text', 'outlined'], defaultValue: 'contained' },
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
  card: {
    controls: [
      { name: 'variant', type: 'select', options: ['elevation', 'outlined'], defaultValue: 'elevation' },
      { name: 'square', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Card variant={props.variant} square={props.square === 'true'} style={{ width: 300, background: "var(--background-paper)" }}>
        <CardContent>
          <h3 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>Material Card</h3>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem" }}>This is a highly customizable card component that you can use to group related content.</p>
        </CardContent>
      </Card>
    )
  },
  checkbox: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Checkbox color={props.color} size={props.size} disabled={props.disabled === 'true'} label={<span style={{ color: "var(--text-primary)" }}>Accept terms</span>} />
    )
  },
  dialog: {
    controls: [
      { name: 'open', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      return (
        <React.Fragment>
          <p style={{ color: 'var(--text-secondary)' }}>Change the 'open' prop to 'true' to see the dialog.</p>
          <Dialog open={props.open === 'true'}>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Are you sure you want to perform this action? It cannot be undone.</p>
            </DialogContent>
            <DialogActions>
              <Button variant="text" color="primary">Cancel</Button>
              <Button variant="contained" color="primary">Confirm</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
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
        placeholder="Enter your text..." 
        disabled={props.disabled === 'true'} 
        error={props.error === 'true'}
      />
    )
  },
  select: {
    controls: [
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Select defaultValue="" disabled={props.disabled === 'true'} error={props.error === 'true'} style={{ width: "200px" }}>
        <option value="" disabled>Choose an option</option>
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
        <span style={{ color: "var(--text-primary)" }}>Toggle feature</span>
      </Flex>
    )
  }
};
