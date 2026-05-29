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
    install: "npm install @material-tail/react",
    usage: `import { Avatar } from "@material-tail/react";

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
    install: "npm install @material-tail/react",
    usage: `import { Badge, Button } from "@material-tail/react";

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
    install: "npm install @material-tail/react",
    usage: `import { Breadcrumbs, Link } from "@material-tail/react";

export default function App() {
  return (
    <Breadcrumbs>
      <Link href="/">Home</Link>
      <Link href="/components">Components</Link>
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
    install: "npm install @material-tail/react",
    usage: `import { Button } from '@material-tail/react';

function App() {
  return (
    <div className="p-4 space-x-2">
      <Button variant="contained">Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Link Button</Button>
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
    install: "npm install @material-tail/react",
    usage: `import { Card } from "@material-tail/react";

export default function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is the card body content.</p>
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
    install: "npm install @material-tail/react",
    usage: `import { Checkbox } from "@material-tail/react";

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
    install: "npm install @material-tail/react",
    usage: `import { Dialog } from "@material-tail/react";

export default function App() {
  return (
    <Dialog open={true} title="Are you sure?">
      <p>This action cannot be undone.</p>
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
    install: "npm install @material-tail/react",
    usage: `import { Input } from "@material-tail/react";

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
    install: "npm install @material-tail/react",
    usage: `import { Select } from "@material-tail/react";

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
    install: "npm install @material-tail/react",
    usage: `import { Switch } from "@material-tail/react";

export default function App() {
  return <Switch label="Enable notifications" />;
}`,
    customization: `/* Customize switch track */\n.track {\n  background-color: var(--secondary);\n}`
  }
};
