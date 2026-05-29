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
      <Avatar variant={props.variant} color={props.color} style={{ width: 64, height: 64, fontSize: 24, color: "#ffffff", backgroundColor: props.color === 'default' ? 'var(--primary)' : undefined }}>AB</Avatar>
    )
  },
  badge: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning'], defaultValue: 'error' },
      { name: 'variant', type: 'select', options: ['standard', 'dot'], defaultValue: 'standard' },
      { name: 'invisible', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'max', type: 'select', options: ['9', '99', '999'], defaultValue: '99' }
    ],
    component: (props: any) => (
      <Badge color={props.color} variant={props.variant} invisible={props.invisible === 'true'} max={Number(props.max)} badgeContent={props.variant === 'dot' ? undefined : 4}>
        <Avatar variant="rounded" style={{ width: 48, height: 48, background: "var(--background-subtle)", color: "#fff" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </Avatar>
      </Badge>
    )
  },
  breadcrumb: {
    controls: [
      { name: 'separator', type: 'select', options: ['/', '>', '-', '→'], defaultValue: '/' }
    ],
    component: (props: any) => (
      <Breadcrumbs separator={props.separator}>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>Home</a>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>Components</a>
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Breadcrumb</span>
      </Breadcrumbs>
    )
  },
  button: {
    controls: [
      { name: 'variant', type: 'select', options: ['contained', 'secondary', 'ghost', 'link', 'text', 'outlined'], defaultValue: 'contained' },
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
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
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Checkbox color={props.color} size={props.size} disabled={props.disabled === 'true'} label={<span style={{ color: "var(--text-primary)" }}>Accept terms</span>} />
    )
  },
  dialog: {
    controls: [],
    component: () => {
      const [open, setOpen] = useState(false);
      return (
        <React.Fragment>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Open Dialog</Button>
          <Dialog open={open}>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Are you sure you want to perform this action? It cannot be undone.</p>
            </DialogContent>
            <DialogActions>
              <Button variant="text" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }
  },
  input: {
    controls: [
      { name: 'variant', type: 'select', options: ['outlined', 'filled', 'standard'], defaultValue: 'outlined' },
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Input 
        placeholder="Enter your text..." 
        variant={props.variant}
        color={props.color}
        size={props.size}
        disabled={props.disabled === 'true'} 
        error={props.error === 'true'}
        fullWidth={props.fullWidth === 'true'}
      />
    )
  },
  select: {
    controls: [
      { name: 'variant', type: 'select', options: ['outlined', 'filled', 'standard'], defaultValue: 'outlined' },
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Select 
        defaultValue="" 
        variant={props.variant}
        color={props.color}
        size={props.size}
        disabled={props.disabled === 'true'} 
        error={props.error === 'true'}
        fullWidth={props.fullWidth === 'true'} 
        style={props.fullWidth === 'true' ? undefined : { width: "200px" }}
      >
        <option value="" disabled>Choose an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    )
  },
  switch: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Flex gap={12} align="center">
        <Switch color={props.color} size={props.size} disabled={props.disabled === 'true'} />
        <span style={{ color: "var(--text-primary)" }}>Toggle feature</span>
      </Flex>
    )
  }
};
