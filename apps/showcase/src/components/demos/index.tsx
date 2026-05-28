import React, { useState } from "react";
// @ts-ignore
import { Button } from "../ui/Button";
// @ts-ignore
import { Input } from "../ui/Input";
// @ts-ignore
import { Alert } from "../ui/Alert";
// @ts-ignore
import { Select } from "../ui/Select";

export const ButtonDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="success">Success</Button>
    </div>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button variant="outlined" color="primary">Outlined</Button>
      <Button variant="text" color="primary">Text</Button>
      <Button variant="ghost" color="primary">Ghost</Button>
    </div>
  </div>
);

export const AlertDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
    <Alert severity="success" title="Success!">Your changes have been saved.</Alert>
    <Alert severity="info" variant="filled">Here is some solid information for you.</Alert>
    <Alert severity="warning" variant="outlined" onClose={() => {}}>Watch out! You might want to double check that.</Alert>
    <Alert severity="error" title="Fatal Error">Something went horribly wrong.</Alert>
  </div>
);

export const SelectDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px" }}>
    <Select label="Choose an option" variant="outlined" color="primary">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
    <Select label="Filled Select" variant="filled" color="secondary" size="small">
      <option value="a">Apple</option>
      <option value="b">Banana</option>
    </Select>
  </div>
);

export const DemoRegistry: Record<string, React.ReactNode> = {
  button: <ButtonDemo />,
  alert: <AlertDemo />,
  select: <SelectDemo />,
};
