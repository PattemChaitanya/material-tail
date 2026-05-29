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
      { name: 'color', type: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'warning'], defaultValue: 'default' },
      { name: 'useImage', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fallback', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Avatar 
        variant={props.variant} 
        color={props.color} 
        src={props.useImage === 'true' ? 'https://i.pravatar.cc/150?u=a042581f4e29026704d' : undefined}
        fallback={props.fallback === 'true' ? 'XY' : undefined}
        style={{ width: 64, height: 64, fontSize: 24, color: "#ffffff", backgroundColor: props.color === 'default' ? 'var(--primary)' : undefined }}
      >
        {(!props.useImage || props.useImage === 'false') && (!props.fallback || props.fallback === 'false') ? 'AB' : undefined}
      </Avatar>
    )
  },
  badge: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning'], defaultValue: 'error' },
      { name: 'variant', type: 'select', options: ['standard', 'dot'], defaultValue: 'standard' },
      { name: 'invisible', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'showZero', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'max', type: 'select', options: ['9', '99', '999'], defaultValue: '99' },
      { name: 'anchor', type: 'select', options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'], defaultValue: 'top-right' },
      { name: 'overlap', type: 'select', options: ['rectangular', 'circular'], defaultValue: 'rectangular' },
      { name: 'content', type: 'select', options: ['4', '0', '100'], defaultValue: '4' }
    ],
    component: (props: any) => {
      const anchorOrigin = {
        vertical: (props.anchor || 'top-right').split('-')[0],
        horizontal: (props.anchor || 'top-right').split('-')[1]
      } as any;
      return (
        <Badge 
          color={props.color} 
          variant={props.variant} 
          invisible={props.invisible === 'true'} 
          showZero={props.showZero === 'true'}
          max={Number(props.max)} 
          anchorOrigin={anchorOrigin}
          overlap={props.overlap}
          badgeContent={props.variant === 'dot' ? undefined : Number(props.content)}
        >
          <Avatar variant={props.overlap === 'circular' ? 'circular' : 'rounded'} style={{ width: 48, height: 48, background: "var(--background-subtle)", color: "#fff" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </Avatar>
        </Badge>
      );
    }
  },
  breadcrumb: {
    controls: [
      { name: 'separator', type: 'select', options: ['/', '>', '-', '→'], defaultValue: '/' },
      { name: 'maxItems', type: 'select', options: ['2', '3', '4', '8'], defaultValue: '3' },
      { name: 'itemsBeforeCollapse', type: 'select', options: ['1', '2'], defaultValue: '1' },
      { name: 'itemsAfterCollapse', type: 'select', options: ['1', '2'], defaultValue: '1' }
    ],
    component: (props: any) => (
      <Breadcrumbs 
        separator={props.separator}
        maxItems={Number(props.maxItems)}
        itemsBeforeCollapse={Number(props.itemsBeforeCollapse)}
        itemsAfterCollapse={Number(props.itemsAfterCollapse)}
      >
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>Home</a>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>Catalog</a>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>Accessories</a>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8 }}>New</a>
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Belts</span>
      </Breadcrumbs>
    )
  },
  button: {
    controls: [
      { name: 'variant', type: 'select', options: ['contained', 'secondary', 'ghost', 'link', 'text', 'outlined'], defaultValue: 'contained' },
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'loading', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'startIcon', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'endIcon', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
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
          loading={props.loading === 'true'}
          startIcon={props.startIcon === 'true' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          ) : undefined}
          endIcon={props.endIcon === 'true' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          ) : undefined}
        >
          Primary Action
        </Button>
      );
    }
  },
  card: {
    controls: [
      { name: 'variant', type: 'select', options: ['elevation', 'outlined'], defaultValue: 'elevation' },
      { name: 'square', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'raised', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'interactive', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Card 
        variant={props.variant} 
        square={props.square === 'true'} 
        raised={props.raised === 'true'}
        interactive={props.interactive === 'true'}
        style={{ width: 300, background: "var(--background-paper)" }}
      >
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
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'error', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'indeterminate', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'required', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Checkbox 
        color={props.color} 
        size={props.size} 
        disabled={props.disabled === 'true'}
        error={props.error === 'true'}
        indeterminate={props.indeterminate === 'true'}
        required={props.required === 'true'}
        label={<span style={{ color: "var(--text-primary)" }}>Accept terms and conditions</span>}
      />
    )
  },
  dialog: {
    controls: [
      { name: 'maxWidth', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'false'], defaultValue: 'sm' },
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'fullScreen', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'showCloseIcon', type: 'select', options: ['false', 'true'], defaultValue: 'true' }
    ],
    component: (props: any) => {
      const [open, setOpen] = useState(false);
      return (
        <React.Fragment>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Open Dialog</Button>
          <Dialog 
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={props.maxWidth === 'false' ? false : props.maxWidth}
            fullWidth={props.fullWidth === 'true'}
            fullScreen={props.fullScreen === 'true'}
            showCloseIcon={props.showCloseIcon === 'true'}
          >
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
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'multiline', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'startIcon', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
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
        multiline={props.multiline === 'true'}
        rows={props.multiline === 'true' ? 4 : undefined}
        startIcon={props.startIcon === 'true' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        ) : undefined}
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
      { name: 'fullWidth', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'multiple', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Select 
        key={props.multiple}
        defaultValue={props.multiple === 'true' ? ["1"] : ""} 
        variant={props.variant}
        color={props.color}
        size={props.size}
        disabled={props.disabled === 'true'} 
        error={props.error === 'true'}
        fullWidth={props.fullWidth === 'true'} 
        multiple={props.multiple === 'true'}
        style={props.fullWidth === 'true' ? undefined : (props.multiple === 'true' ? { width: "200px", minHeight: "100px" } : { width: "200px" })}
      >
        <option value="" disabled={props.multiple !== 'true'}>Choose an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    )
  },
  radio: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'row', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { RadioGroup, Radio } = require('../ui/Radio');
      return (
        <RadioGroup defaultValue="1" row={props.row === 'true'}>
          <Radio color={props.color} size={props.size} disabled={props.disabled === 'true'} value="1" label="Option 1" />
          <Radio color={props.color} size={props.size} disabled={props.disabled === 'true'} value="2" label="Option 2" />
          <Radio color={props.color} size={props.size} disabled={props.disabled === 'true'} value="3" label="Option 3" />
        </RadioGroup>
      );
    }
  },
  switch: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'], defaultValue: 'primary' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'disabled', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'required', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => (
      <Flex gap={12} align="center">
        <Switch 
          color={props.color} 
          size={props.size} 
          disabled={props.disabled === 'true'} 
          required={props.required === 'true'}
          label={<span style={{ color: "var(--text-primary)" }}>Toggle feature</span>} 
        />
      </Flex>
    )
  },
  tabs: {
    controls: [
      { name: 'variant', type: 'select', options: ['standard', 'scrollable', 'fullWidth'], defaultValue: 'standard' },
      { name: 'centered', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'indicatorColor', type: 'select', options: ['primary', 'secondary'], defaultValue: 'primary' },
      { name: 'textColor', type: 'select', options: ['primary', 'secondary', 'inherit'], defaultValue: 'primary' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Tabs, Tab, TabPanel } = require('../ui/Tabs');
      return (
        <Card style={{ width: "100%", maxWidth: 500 }}>
          <Tabs 
            key={props.variant + props.centered}
            defaultValue="1" 
            variant={props.variant} 
            centered={props.centered === 'true'}
            indicatorColor={props.indicatorColor}
            textColor={props.textColor}
          >
            <Tab value="1" label="Recent" />
            <Tab value="2" label="Favorites" />
            <Tab value="3" label="Nearby" />
            
            <TabPanel value="1">
              <p style={{ color: "var(--text-secondary)", margin: 0, padding: 16 }}>Recent items appear here.</p>
            </TabPanel>
            <TabPanel value="2">
              <p style={{ color: "var(--text-secondary)", margin: 0, padding: 16 }}>Your favorite items appear here.</p>
            </TabPanel>
            <TabPanel value="3">
              <p style={{ color: "var(--text-secondary)", margin: 0, padding: 16 }}>Items nearby appear here.</p>
            </TabPanel>
          </Tabs>
        </Card>
      );
    }
  },
  list: {
    controls: [
      { name: 'dense', type: 'select', options: ['false', 'true'], defaultValue: 'false' },
      { name: 'disablePadding', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { List, ListItem, ListItemText, ListItemIcon } = require('../ui/List');
      return (
        <Card style={{ width: "100%", maxWidth: 360 }}>
          <List dense={props.dense === 'true'} disablePadding={props.disablePadding === 'true'}>
            <ListItem button>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </ListItemIcon>
              <ListItemText primary="Settings" secondary="Configure options" />
            </ListItem>
          </List>
        </Card>
      );
    }
  },
  pagination: {
    controls: [
      { name: 'count', type: 'select', options: ['5', '10', '20'], defaultValue: '10' },
      { name: 'color', type: 'select', options: ['standard', 'primary', 'secondary'], defaultValue: 'standard' },
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
      { name: 'shape', type: 'select', options: ['circular', 'rounded'], defaultValue: 'circular' },
      { name: 'variant', type: 'select', options: ['text', 'outlined'], defaultValue: 'text' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Pagination } = require('../ui/Pagination');
      return (
        <Pagination 
          count={Number(props.count)} 
          color={props.color}
          size={props.size}
          shape={props.shape}
          variant={props.variant}
        />
      );
    }
  },
  paper: {
    controls: [
      { name: 'elevation', type: 'select', options: ['0', '1', '2', '3', '4', '8', '12', '16', '24'], defaultValue: '1' },
      { name: 'variant', type: 'select', options: ['elevation', 'outlined'], defaultValue: 'elevation' },
      { name: 'square', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Paper } = require('../ui/Paper');
      return (
        <Paper 
          elevation={Number(props.elevation)} 
          variant={props.variant} 
          square={props.square === 'true'}
          style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ color: "var(--text-secondary)" }}>Paper</span>
        </Paper>
      );
    }
  },
  table: {
    controls: [
      { name: 'size', type: 'select', options: ['small', 'medium'], defaultValue: 'medium' },
      { name: 'stickyHeader', type: 'select', options: ['false', 'true'], defaultValue: 'false' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } = require('../ui/Table');
      // @ts-ignore
      const { Paper } = require('../ui/Paper');
      return (
        <TableContainer component={Paper} style={{ maxWidth: 600, maxHeight: 200 }}>
          <Table size={props.size} stickyHeader={props.stickyHeader === 'true'}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Frozen yoghurt</TableCell>
                <TableCell align="right">159</TableCell>
                <TableCell align="right">6.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ice cream sandwich</TableCell>
                <TableCell align="right">237</TableCell>
                <TableCell align="right">9.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Eclair</TableCell>
                <TableCell align="right">262</TableCell>
                <TableCell align="right">16.0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  },
  appbar: {
    controls: [
      { name: 'color', type: 'select', options: ['primary', 'secondary', 'default', 'transparent', 'inherit'], defaultValue: 'primary' },
      { name: 'position', type: 'select', options: ['fixed', 'absolute', 'sticky', 'static', 'relative'], defaultValue: 'static' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { AppBar, Toolbar } = require('../ui/AppBar');
      // @ts-ignore
      const { Box } = require('../ui/Box');
      return (
        <Box style={{ width: "100%", height: "200px", position: "relative", overflow: "auto", border: "1px solid var(--border-color)", borderRadius: 8 }}>
          <AppBar color={props.color} position={props.position}>
            <Toolbar>
              <h3 style={{ margin: 0, flexGrow: 1, color: "inherit" }}>App Bar</h3>
              <Button color="primary" variant="text">Login</Button>
            </Toolbar>
          </AppBar>
          <Box style={{ padding: 16 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i} style={{ color: "var(--text-secondary)" }}>Scroll content line {i + 1}</p>
            ))}
          </Box>
        </Box>
      );
    }
  },
  drawer: {
    controls: [
      { name: 'anchor', type: 'select', options: ['left', 'right', 'top', 'bottom'], defaultValue: 'left' },
      { name: 'variant', type: 'select', options: ['temporary', 'persistent', 'permanent'], defaultValue: 'temporary' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Drawer } = require('../ui/Drawer');
      // @ts-ignore
      const { List, ListItem, ListItemText } = require('../ui/List');
      // @ts-ignore
      const { Box } = require('../ui/Box');
      const [open, setOpen] = useState(false);
      
      return (
        <React.Fragment>
          <Button variant="outlined" onClick={() => setOpen(true)}>Open Drawer</Button>
          <Drawer 
            anchor={props.anchor} 
            open={open} 
            variant={props.variant}
            onClose={() => setOpen(false)}
          >
            <Box style={{ width: props.anchor === 'top' || props.anchor === 'bottom' ? 'auto' : 250 }}>
              <List>
                <ListItem button><ListItemText primary="Inbox" /></ListItem>
                <ListItem button><ListItemText primary="Starred" /></ListItem>
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      );
    }
  },
  box: {
    controls: [
      { name: 'bg', type: 'select', options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'], defaultValue: 'primary' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Box } = require('../ui/Box');
      return (
        <Box style={{ padding: "24px", background: `var(--${props.bg})`, color: "#fff", borderRadius: "8px" }}>
          I am a Box!
        </Box>
      );
    }
  },
  flex: {
    controls: [
      { name: 'direction', type: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'], defaultValue: 'row' },
      { name: 'align', type: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'], defaultValue: 'center' },
      { name: 'justify', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'], defaultValue: 'flex-start' },
      { name: 'gap', type: 'select', options: ['0', '8', '16', '24', '32'], defaultValue: '16' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Flex } = require('../ui/Flex');
      // @ts-ignore
      const { Box } = require('../ui/Box');
      return (
        <Flex 
          direction={props.direction} 
          align={props.align} 
          justify={props.justify} 
          gap={Number(props.gap)}
          style={{ width: "100%", height: 200, border: "1px dashed var(--border-color)", padding: 16 }}
        >
          <Box style={{ padding: 16, background: "var(--primary)", color: "#fff", borderRadius: 4 }}>Item 1</Box>
          <Box style={{ padding: 16, background: "var(--secondary)", color: "#fff", borderRadius: 4 }}>Item 2</Box>
          <Box style={{ padding: 16, background: "var(--success)", color: "#fff", borderRadius: 4 }}>Item 3</Box>
        </Flex>
      );
    }
  },
  grid: {
    controls: [
      { name: 'spacing', type: 'select', options: ['0', '1', '2', '3', '4'], defaultValue: '2' },
      { name: 'itemSize', type: 'select', options: ['4', '6', '12'], defaultValue: '6' }
    ],
    component: (props: any) => {
      // @ts-ignore
      const { Grid } = require('../ui/Grid');
      // @ts-ignore
      const { Box } = require('../ui/Box');
      const size = Number(props.itemSize);
      return (
        <Grid container spacing={Number(props.spacing)} style={{ width: "100%" }}>
          <Grid item xs={size}>
            <Box style={{ padding: 16, background: "var(--background-paper)", border: "1px solid var(--border-color)", textAlign: "center" }}>xs={size}</Box>
          </Grid>
          <Grid item xs={size}>
            <Box style={{ padding: 16, background: "var(--background-paper)", border: "1px solid var(--border-color)", textAlign: "center" }}>xs={size}</Box>
          </Grid>
          <Grid item xs={size}>
            <Box style={{ padding: 16, background: "var(--background-paper)", border: "1px solid var(--border-color)", textAlign: "center" }}>xs={size}</Box>
          </Grid>
          <Grid item xs={size}>
            <Box style={{ padding: 16, background: "var(--background-paper)", border: "1px solid var(--border-color)", textAlign: "center" }}>xs={size}</Box>
          </Grid>
        </Grid>
      );
    }
  }
};
