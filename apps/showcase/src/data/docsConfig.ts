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
  button: {
    id: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    category: "Inputs",
    install: "npx @material-tail/cli add button",
    usage: `import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <Button variant="contained" color="primary">
      Click me
    </Button>
  );
}`,
    customization: `/* Button.module.css */
.button {
  /* Change the border radius */
  border-radius: 9999px; 
  /* Add custom box shadow */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}`,
  },
  alert: {
    id: "alert",
    title: "Alert",
    description: "Displays a callout for user attention.",
    category: "Data Display",
    install: "npx @material-tail/cli add alert",
    usage: `import { Alert } from "./components/ui/Alert";

export default function App() {
  return (
    <Alert severity="success" title="Success!">
      Your changes have been saved successfully.
    </Alert>
  );
}`,
    customization: `/* Alert.module.css */
.alert {
  /* Make alerts fully rounded */
  border-radius: var(--radius-full);
}`,
  },
  select: {
    id: "select",
    title: "Select",
    description: "Displays a dropdown list of options.",
    category: "Inputs",
    install: "npx @material-tail/cli add select",
    usage: `import { Select } from "./components/ui/Select";

export default function App() {
  return (
    <Select label="Choose an option" variant="outlined">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  );
}`,
    customization: `/* Select.module.css */
.select {
  /* Change typography of the select text */
  font-weight: 500;
}`,
  }
};
