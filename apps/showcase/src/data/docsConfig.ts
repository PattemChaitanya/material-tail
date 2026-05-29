export interface ComponentDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  install: string;
  usage: string;
  customization: string;
}

export const docsConfig: Record<string, ComponentDoc> = {
  avatar: {
    id: "avatar",
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    category: "Components",
    install: "npx @material-tail/cli add avatar",
    usage: `import { Avatar } from "@/components/ui/Avatar";

export default function App() {
  return <Avatar src="/user.png" alt="User Name" fallback="UN" />;
}`,
    customization: `/* Customize avatar shapes */\n.avatar {\n  border-radius: 8px;\n}`
  },
  badge: {
    id: "badge",
    title: "Badge",
    description: "Displays a small badge or count on top of its children.",
    category: "Components",
    install: "npx @material-tail/cli add badge",
    usage: `import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function App() {
  return (
    <Badge count={5} color="error">
      <Button variant="outlined">Notifications</Button>
    </Badge>
  );
}`,
    customization: `/* Customize badge colors */\n.badge {\n  background-color: var(--primary);\n}`
  },
  breadcrumb: {
    id: "breadcrumb",
    title: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    category: "Components",
    install: "npx @material-tail/cli add breadcrumb",
    usage: `import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function App() {
  return (
    <Breadcrumbs>
      <a href="/">Home</a>
      <a href="/components">Components</a>
      <span>Breadcrumb</span>
    </Breadcrumbs>
  );
}`,
    customization: `/* Customize breadcrumb separator */\n.separator {\n  color: var(--text-secondary);\n}`
  },
  button: {
    id: "button",
    title: "Button",
    description: "A versatile button component used to trigger an action or event.",
    category: "Components",
    install: "npx @material-tail/cli add button",
    usage: `import { Button } from "@/components/ui/Button";

function App() {
  return (
    <div className="p-4 space-x-2">
      <Button variant="contained">Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`,
    customization: `/* Button.module.css */
.button {
  /* Change the border radius */
  border-radius: 9999px; 
}`
  },
  card: {
    id: "card",
    title: "Card",
    description: "A container used to group related content and actions.",
    category: "Components",
    install: "npx @material-tail/cli add card",
    usage: `import { Card, CardContent } from "@/components/ui/Card";

export default function App() {
  return (
    <Card>
      <CardContent>
        <h2>Card Title</h2>
        <p>This is the card body content.</p>
      </CardContent>
    </Card>
  );
}`,
    customization: `/* Customize card padding */\n.card {\n  padding: 24px;\n}`
  },
  checkbox: {
    id: "checkbox",
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Components",
    install: "npx @material-tail/cli add checkbox",
    usage: `import { Checkbox } from "@/components/ui/Checkbox";

export default function App() {
  return <Checkbox label="Accept terms and conditions" />;
}`,
    customization: `/* Customize checkbox accent */\n.checkbox input:checked {\n  background-color: var(--primary);\n}`
  },
  dialog: {
    id: "dialog",
    title: "Dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    category: "Components",
    install: "npx @material-tail/cli add dialog",
    usage: `import { Dialog, DialogTitle, DialogContent } from "@/components/ui/Dialog";

export default function App() {
  return (
    <Dialog open={true}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <p>This action cannot be undone.</p>
      </DialogContent>
    </Dialog>
  );
}`,
    customization: `/* Customize dialog backdrop */\n.backdrop {\n  background-color: rgba(0,0,0,0.8);\n}`
  },
  input: {
    id: "input",
    title: "Input",
    description: "A basic text field used to get user input.",
    category: "Components",
    install: "npx @material-tail/cli add input",
    usage: `import { Input } from "@/components/ui/Input";

export default function App() {
  return <Input placeholder="Enter your email" type="email" />;
}`,
    customization: `/* Customize input focus ring */\n.input:focus {\n  border-color: var(--primary);\n}`
  },
  select: {
    id: "select",
    title: "Select",
    description: "Displays a dropdown list of options.",
    category: "Components",
    install: "npx @material-tail/cli add select",
    usage: `import { Select } from "@/components/ui/Select";

export default function App() {
  return (
    <Select placeholder="Choose an option">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  );
}`,
    customization: `/* Customize select chevron */\n.select {\n  padding-right: 32px;\n}`
  },
  switch: {
    id: "switch",
    title: "Switch",
    description: "A control that allows the user to toggle between on and off states.",
    category: "Components",
    install: "npx @material-tail/cli add switch",
    usage: `import { Switch } from "@/components/ui/Switch";

export default function App() {
  return <Switch label="Enable notifications" />;
}`,
    customization: `/* Customize switch track */\n.track {\n  background-color: var(--secondary);\n}`
  },
  tabs: {
    id: "tabs",
    title: "Tabs",
    description: "Organize and allow navigation between groups of content that are related and at the same level of hierarchy.",
    category: "Navigation",
    install: "npx @material-tail/cli add tabs",
    usage: `import { Tabs, Tab, TabPanel } from "@/components/ui/Tabs";

export default function App() {
  return (
    <Tabs defaultValue="1">
      <Tab value="1" label="Tab One" />
      <Tab value="2" label="Tab Two" />
      <TabPanel value="1">Content One</TabPanel>
      <TabPanel value="2">Content Two</TabPanel>
    </Tabs>
  );
}`,
    customization: `/* Customize active tab indicator */\n.tab[data-active="true"] {\n  border-bottom-color: var(--primary);\n}`
  },
  list: {
    id: "list",
    title: "List",
    description: "Continuous, vertical indexes of text or images.",
    category: "Data Display",
    install: "npx @material-tail/cli add list",
    usage: `import { List, ListItem, ListItemText } from "@/components/ui/List";

export default function App() {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Item 1" secondary="Description 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" />
      </ListItem>
    </List>
  );
}`,
    customization: `/* Customize list item hover */\n.listItem:hover {\n  background-color: var(--action-hover);\n}`
  },
  pagination: {
    id: "pagination",
    title: "Pagination",
    description: "Enables the user to select a specific page from a range of pages.",
    category: "Navigation",
    install: "npx @material-tail/cli add pagination",
    usage: `import { Pagination } from "@/components/ui/Pagination";

export default function App() {
  return <Pagination count={10} page={1} />;
}`,
    customization: `/* Customize active page */\n.item[data-selected="true"] {\n  background-color: var(--primary);\n}`
  },
  paper: {
    id: "paper",
    title: "Paper",
    description: "A surface container for displaying content on an elevated background.",
    category: "Surfaces",
    install: "npx @material-tail/cli add paper",
    usage: `import { Paper } from "@/components/ui/Paper";

export default function App() {
  return <Paper elevation={2}>Content goes here</Paper>;
}`,
    customization: `/* Customize paper background */\n.paper {\n  background-color: var(--background-paper);\n}`
  },
  table: {
    id: "table",
    title: "Table",
    description: "Displays sets of data across rows and columns.",
    category: "Data Display",
    install: "npx @material-tail/cli add table",
    usage: `import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";

export default function App() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Data 1</TableCell>
          <TableCell>Data 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    customization: `/* Customize table borders */\n.cell {\n  border-bottom: 1px solid var(--divider);\n}`
  },
  appbar: {
    id: "appbar",
    title: "App Bar",
    description: "The top App Bar provides content and actions related to the current screen.",
    category: "Surfaces",
    install: "npx @material-tail/cli add appbar",
    usage: `import { AppBar, Toolbar } from "@/components/ui/AppBar";

export default function App() {
  return (
    <AppBar position="static">
      <Toolbar>
        <h3>My Application</h3>
      </Toolbar>
    </AppBar>
  );
}`,
    customization: `/* Customize appbar shadow */\n.appBar {\n  box-shadow: var(--shadow-md);\n}`
  },
  drawer: {
    id: "drawer",
    title: "Drawer",
    description: "Navigation drawers provide access to destinations in your app.",
    category: "Navigation",
    install: "npx @material-tail/cli add drawer",
    usage: `import { Drawer } from "@/components/ui/Drawer";

export default function App() {
  return (
    <Drawer open={true} anchor="left">
      <p>Drawer Content</p>
    </Drawer>
  );
}`,
    customization: `/* Customize drawer width */\n.drawerPaper {\n  width: 250px;\n}`
  },
  box: {
    id: "box",
    title: "Box",
    description: "The Box component serves as a wrapper component for most of the CSS utility needs.",
    category: "Layout",
    install: "npx @material-tail/cli add box",
    usage: `import { Box } from "@/components/ui/Box";

export default function App() {
  return <Box style={{ padding: "16px", background: "red" }}>Box Content</Box>;
}`,
    customization: `/* Box uses inline styles or utility classes directly. */`
  },
  flex: {
    id: "flex",
    title: "Flex",
    description: "A specialized Box component with display: flex enabled by default.",
    category: "Layout",
    install: "npx @material-tail/cli add flex",
    usage: `import { Flex } from "@/components/ui/Flex";

export default function App() {
  return (
    <Flex align="center" justify="space-between" gap={16}>
      <div>Left</div>
      <div>Right</div>
    </Flex>
  );
}`,
    customization: `/* Flex uses flexbox utilities under the hood. */`
  },
  grid: {
    id: "grid",
    title: "Grid",
    description: "The Grid component provides a flexible grid layout system.",
    category: "Layout",
    install: "npx @material-tail/cli add grid",
    usage: `import { Grid, GridItem } from "@/components/ui/Grid";

export default function App() {
  return (
    <Grid container spacing={2}>
      <GridItem xs={6}>Half Width</GridItem>
      <GridItem xs={6}>Half Width</GridItem>
    </Grid>
  );
}`,
    customization: `/* Grid uses CSS grid or flexbox grid under the hood. */`
  }
};
