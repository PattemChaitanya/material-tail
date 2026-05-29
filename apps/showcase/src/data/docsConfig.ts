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
  }
};
