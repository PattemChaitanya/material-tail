# Material UI Clone

A lightweight Material UI component library built with React and TypeScript.

## Installation

```bash
npm install @your-username/material-ui-clone
# or
yarn add @your-username/material-ui-clone
```

## Usage

First, wrap your application with the ThemeProvider:

```jsx
import { ThemeProvider } from '@your-username/material-ui-clone';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

Then you can use any of the components:

```jsx
import { Button, Input, Card } from '@your-username/material-ui-clone';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="contained">Click me</Button>
    </Card>
  );
}
```

## Available Components

- Button
- Input
- Checkbox
- Switch
- Radio
- Select
- TextField
- Slider
- Progress
- Chip
- Badge
- Alert
- Avatar
- Tooltip
- Dialog
- Snackbar
- Menu
- Tabs
- Mention
- Table
- Pagination
- List
- Card
- Header
- Sidebar
- Paper

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build the package
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
