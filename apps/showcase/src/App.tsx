import React, { useState } from "react";
// Components installed by: npx material-tail add button input
// @ts-ignore — CSS module typings provided by react-app-env.d.ts
import { Button } from "./components/ui/Button";
// @ts-ignore
import { Input } from "./components/ui/Input";
import { Checkbox } from "./components/ui/Checkbox";
import { Switch } from "./components/ui/Switch";
import { Radio } from "./components/ui/Radio";
import { Select } from "./components/ui/Select";
import { Slider } from "./components/ui/Slider";
import { Chip } from "./components/ui/Chip";
import { Badge } from "./components/ui/Badge";
import { Alert } from "./components/ui/Alert";
import { Avatar } from "./components/ui/Avatar";
import { Progress } from "./components/ui/Progress";
import { Tooltip } from "./components/ui/Tooltip";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "./components/ui/Dialog";
import { Snackbar } from "./components/ui/Snackbar";
import { Menu, MenuItem } from "./components/ui/Menu";
import { Tabs, Tab, TabPanel } from "./components/ui/Tabs";
import { List, ListItem, ListItemText, ListItemIcon } from "./components/ui/List";
import { Pagination } from "./components/ui/Pagination";
import { Breadcrumbs } from "./components/ui/Breadcrumbs";
import { Paper } from "./components/ui/Paper";
import { Card, CardContent, CardActions, CardMedia } from "./components/ui/Card";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "./components/ui/Table";
import { AppBar, Toolbar } from "./components/ui/AppBar";
import { Drawer } from "./components/ui/Drawer";
import { Box } from "./components/ui/Box";
import { Flex } from "./components/ui/Flex";
import { Grid } from "./components/ui/Grid";

function App() {
  const [inputValue, setInputValue] = useState("");
  
  // Batch 3 States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Batch 4 States
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);

  // Batch 5 States
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "40px auto",
        backgroundColor: "var(--background-paper, #fff)",
        borderRadius: "var(--radius-lg, 8px)",
        boxShadow: "var(--shadow-xl)",
        fontFamily: "var(--font-family)",
      }}
    >
      <h1
        style={{
          color: "var(--primary)",
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-bold)",
          marginBottom: "8px",
        }}
      >
        Material-Tail Showcase
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>
        Components installed via CLI · styled with CSS Modules · themed with CSS
        variables
      </p>

      {/* ---- Buttons ---- */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-semibold)",
            marginBottom: "16px",
            color: "var(--text-primary)",
          }}
        >
          Buttons
        </h2>

        <div style={{ marginBottom: "12px" }}>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Contained</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" color="secondary">Secondary</Button>
            <Button variant="contained" color="error">Error</Button>
            <Button variant="contained" color="warning">Warning</Button>
            <Button variant="contained" color="info">Info</Button>
            <Button variant="contained" color="success">Success</Button>
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Outlined</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="outlined" color="primary">Primary</Button>
            <Button variant="outlined" color="secondary">Secondary</Button>
            <Button variant="outlined" color="error">Error</Button>
            <Button variant="outlined" color="success">Success</Button>
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Text &amp; States</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="text" color="primary">Text</Button>
            <Button variant="ghost" color="primary">Ghost</Button>
            <Button variant="contained" color="primary" disabled>Disabled</Button>
            <Button variant="contained" color="primary" loading>Loading</Button>
          </div>
        </div>

        <div>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sizes</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="contained" color="primary" size="small">Small</Button>
            <Button variant="contained" color="primary" size="medium">Medium</Button>
            <Button variant="contained" color="primary" size="large">Large</Button>
          </div>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-semibold)",
            marginBottom: "16px",
            color: "var(--text-primary)",
          }}
        >
          Inputs
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Input
            label="Outlined (primary)"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
            helperText="This is a helper text"
            fullWidth
          />
          <Input
            variant="filled"
            label="Filled (secondary)"
            color="secondary"
            placeholder="Filled input..."
            fullWidth
          />
          <Input
            variant="standard"
            label="Standard (success)"
            color="success"
            placeholder="Standard input..."
            fullWidth
          />
          <Input
            variant="outlined"
            label="Error state"
            color="error"
            error
            helperText="This field is required"
            placeholder="Invalid input..."
            fullWidth
          />
          <Input
            label="Disabled"
            placeholder="Cannot type..."
            disabled
            fullWidth
          />
        </div>
      </section>

      {/* BATCH 1 COMPONENTS */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Batch 1: Input Controls</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-start" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Checkbox</h3>
            <Checkbox label="Default Checkbox" />
            <Checkbox label="Primary (Large)" size="large" defaultChecked color="primary" />
            <Checkbox label="Secondary (Small)" size="small" defaultChecked color="secondary" />
            <Checkbox label="Error" color="error" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled Checked" disabled defaultChecked />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Switch</h3>
            <Switch label="Default Switch" />
            <Switch label="Primary (Large)" size="large" defaultChecked color="primary" />
            <Switch label="Secondary (Small)" size="small" defaultChecked color="secondary" />
            <Switch label="Error" color="error" defaultChecked />
            <Switch label="Disabled" disabled />
            <Switch label="Disabled Checked" disabled defaultChecked />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Radio</h3>
            <Radio label="Default Radio" name="radio-group-1" />
            <Radio label="Primary (Large)" size="large" defaultChecked color="primary" name="radio-group-1" />
            <Radio label="Secondary (Small)" size="small" color="secondary" name="radio-group-1" />
            <Radio label="Error" color="error" defaultChecked name="radio-group-2" />
            <Radio label="Disabled" disabled />
            <Radio label="Disabled Checked" disabled defaultChecked />
          </div>
        </div>
      </section>

      <section>
        <h2>Select & Slider</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "400px" }}>
          <Select label="Choose an option" variant="outlined" color="primary">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>

          <Select label="Filled Select" variant="filled" color="secondary" size="small">
            <option value="a">Apple</option>
            <option value="b">Banana</option>
          </Select>

          <Slider label="Volume" color="primary" defaultValue={50} />
          <Slider label="Brightness (Error)" color="error" size="large" defaultValue={80} />
          <Slider label="Disabled Slider" disabled defaultValue={30} />
        </div>
      </section>

      {/* BATCH 2 COMPONENTS */}
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2>Batch 2: Data Display</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Chip</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Chip label="Default Chip" />
              <Chip label="Primary Contained" color="primary" variant="contained" />
              <Chip label="Secondary Outlined" color="secondary" variant="outlined" />
              <Chip label="Ghost Error" color="error" variant="ghost" />
              <Chip label="Deletable Info" color="info" onDelete={() => console.log('delete')} />
              <Chip label="Clickable Warning" color="warning" onClick={() => console.log('click')} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Badge & Avatar</h3>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <Badge badgeContent={4} color="primary">
                <Avatar />
              </Badge>
              <Badge badgeContent={100} color="secondary" max={99}>
                <Avatar color="primary">AB</Avatar>
              </Badge>
              <Badge variant="dot" color="error">
                <Avatar variant="rounded" color="success">Sq</Avatar>
              </Badge>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Jane Doe" />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Alert</h3>
            <Alert severity="success" title="Success!">Your changes have been saved.</Alert>
            <Alert severity="info" variant="filled">Here is some solid information for you.</Alert>
            <Alert severity="warning" variant="outlined" onClose={() => {}}>Watch out! You might want to double check that.</Alert>
            <Alert severity="error" title="Fatal Error">Something went horribly wrong.</Alert>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <h3>Progress</h3>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Progress type="circular" color="primary" />
              <Progress type="circular" color="secondary" variant="determinate" value={75} />
              <Progress type="circular" color="error" />
            </div>
            <Progress type="linear" color="primary" />
            <Progress type="linear" color="success" variant="determinate" value={60} />
          </div>

        </div>
      </section>

      {/* BATCH 3 COMPONENTS */}
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2>Batch 3: Overlays</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Tooltip</h3>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Tooltip title="Delete" placement="top" arrow>
                <Button color="error" variant="contained">Hover Me (Top)</Button>
              </Tooltip>
              <Tooltip title="Add to cart" placement="right">
                <Button color="primary" variant="outlined">Hover Me (Right)</Button>
              </Tooltip>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Dialog</h3>
            <div>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Use Google's location service?</DialogTitle>
                <DialogContent>
                  Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </DialogContent>
                <DialogActions>
                  <Button variant="text" color="primary" onClick={() => setDialogOpen(false)}>Disagree</Button>
                  <Button variant="text" color="primary" onClick={() => setDialogOpen(false)}>Agree</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Snackbar</h3>
            <div>
              <Button variant="contained" color="secondary" onClick={() => setSnackbarOpen(true)}>Show Snackbar</Button>
              <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={4000} 
                onClose={() => setSnackbarOpen(false)}
                message="Note archived successfully"
                action={
                  <Button variant="text" color="primary" onClick={() => setSnackbarOpen(false)} size="small" style={{ color: 'var(--primary-subtle, #90caf9)' }}>UNDO</Button>
                }
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Menu</h3>
            <div>
              <Button 
                variant="contained" 
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => setMenuAnchorEl(e.currentTarget)}
              >
                Open Menu
              </Button>
              <Menu 
                open={Boolean(menuAnchorEl)} 
                anchorEl={menuAnchorEl} 
                onClose={() => setMenuAnchorEl(null)}
              >
                <MenuItem onClick={() => setMenuAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setMenuAnchorEl(null)}>My account</MenuItem>
                <MenuItem disabled>Disabled option</MenuItem>
                <MenuItem onClick={() => setMenuAnchorEl(null)}>Logout</MenuItem>
              </Menu>
            </div>
          </div>

        </div>
      </section>

      {/* BATCH 4 COMPONENTS */}
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2>Batch 4: Navigation</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Tabs</h3>
            <div style={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} color="primary">
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" disabled />
              </Tabs>
            </div>
            <TabPanel value={tabValue} index={0}>
              Item One Content
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Item Two Content
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Item Three Content (Disabled)
            </TabPanel>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360 }}>
            <h3>List</h3>
            <div style={{ backgroundColor: 'var(--action-hover, rgba(0, 0, 0, 0.04))' }}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                  </ListItemIcon>
                  <ListItemText primary="Inbox" secondary="2 new messages" />
                </ListItem>
                <ListItem button selected>
                  <ListItemIcon>
                    <svg viewBox="0 0 24 24"><path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6H3v12h18V6z"/></svg>
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
              </List>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Pagination</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Pagination count={10} page={page} onChange={(e, p) => setPage(p)} color="primary" />
              <Pagination count={10} page={page} onChange={(e, p) => setPage(p)} color="secondary" variant="outlined" shape="rounded" />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Breadcrumbs</h3>
            <Breadcrumbs maxItems={3}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Catalog</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Accessories</a>
              <span style={{ color: 'var(--text-primary)' }}>Shoes</span>
            </Breadcrumbs>
          </div>

        </div>
      </section>

      {/* BATCH 5 COMPONENTS */}
      <section style={{ marginTop: "40px", marginBottom: "40px" }}>
        <h2>Batch 5: Layout</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Paper</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Paper elevation={0} style={{ padding: 16 }}>Elevation 0</Paper>
              <Paper elevation={1} style={{ padding: 16 }}>Elevation 1 (Default)</Paper>
              <Paper elevation={4} style={{ padding: 16 }}>Elevation 4</Paper>
              <Paper elevation={8} style={{ padding: 16 }}>Elevation 8</Paper>
              <Paper variant="outlined" style={{ padding: 16 }}>Outlined Paper</Paper>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Card</h3>
            <Card style={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                style={{ height: 140 }}
              />
              <CardContent>
                <h4 style={{ margin: "0 0 8px 0" }}>Lizard</h4>
                <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </p>
              </CardContent>
              <CardActions>
                <Button variant="text" color="primary" size="small">Share</Button>
                <Button variant="text" color="primary" size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Table</h3>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">Dessert (100g serving)</TableCell>
                    <TableCell variant="head" align="right">Calories</TableCell>
                    <TableCell variant="head" align="right">Fat (g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>Frozen yoghurt</TableCell>
                    <TableCell align="right">159</TableCell>
                    <TableCell align="right">6.0</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Ice cream sandwich</TableCell>
                    <TableCell align="right">237</TableCell>
                    <TableCell align="right">9.0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>AppBar & Drawer</h3>
            <div style={{ position: "relative", overflow: "hidden", height: 200, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 4 }}>
              <AppBar position="absolute">
                <Toolbar>
                  <Button variant="text" onClick={() => setDrawerOpen(true)} style={{ color: "inherit" }}>☰ Menu</Button>
                  <h4 style={{ marginLeft: 16, flexGrow: 1 }}>News</h4>
                  <Button variant="text" style={{ color: "inherit" }}>Login</Button>
                </Toolbar>
              </AppBar>
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div style={{ width: 250, padding: 16 }}>
                  <h3 style={{ marginTop: 0 }}>Sidebar Menu</h3>
                  <List>
                    <ListItem button onClick={() => setDrawerOpen(false)}><ListItemText primary="Home" /></ListItem>
                    <ListItem button onClick={() => setDrawerOpen(false)}><ListItemText primary="About" /></ListItem>
                  </List>
                </div>
              </Drawer>
              <div style={{ padding: "80px 16px 16px" }}>
                <p>Click the "Menu" button in the AppBar to open the Drawer.</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3>Grid, Flex, Box</h3>
            
            <h4>Box</h4>
            <Box style={{ padding: 16, border: "1px solid var(--border-color)", backgroundColor: "var(--background-subtle)" }}>
              This is a Box component.
            </Box>

            <h4>Flex</h4>
            <Flex gap={16} align="center" style={{ padding: 16, border: "1px solid var(--border-color)", backgroundColor: "var(--background-subtle)" }}>
              <Button variant="contained">Flex Item 1</Button>
              <Button variant="outlined">Flex Item 2</Button>
              <span>Flex Item 3</span>
            </Flex>

            <h4>Grid</h4>
            <Box style={{ padding: 16, border: "1px solid var(--border-color)", backgroundColor: "var(--background-subtle)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper style={{ padding: 16, textAlign: "center" }}>Item 1 (4 cols md)</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper style={{ padding: 16, textAlign: "center" }}>Item 2 (4 cols md)</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper style={{ padding: 16, textAlign: "center" }}>Item 3 (4 cols md)</Paper>
                </Grid>
              </Grid>
            </Box>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;
