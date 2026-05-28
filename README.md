# Material-Tail

**Material-Tail** is a headless, fully customizable component library heavily inspired by [shadcn/ui](https://ui.shadcn.com/), but built on top of robust, scoped **CSS Modules** rather than Tailwind CSS. It provides beautifully designed, accessible React components that you copy and paste into your apps via a smart CLI tool.

It is designed for developers who want the structural benefits of Material UI, the copy-paste ownership model of shadcn, and the clean isolation of CSS Modules without the overhead of heavy styling frameworks.

---

## 🚀 Quick Start

You don't install Material-Tail as a massive dependency. Instead, you use the CLI to add the components you need directly into your project's source code.

### 1. Initialize the Project

Run the `init` command in your React project. This will set up your base `index.css` with a fully featured CSS Variables theme (including beautiful dark mode support) and configure where components should be installed.

```bash
npx @material-tail/cli init
```

### 2. Add Components

Use the `add` command to download components into your project.

```bash
npx @material-tail/cli add button input card
```

This will automatically create the component files (e.g. `Button.tsx`, `Button.module.css`) in your project's components directory.

### 3. Use Them in Your App

Since the components now live in your project's codebase, you own them completely. Import them just like any other local file:

```tsx
import { Button } from "./components/ui/Button";

export default function App() {
  return <Button variant="filled" color="primary">Click Me</Button>;
}
```

---

## 🏗️ Architecture

Material-Tail is built as a **monorepo** consisting of two main parts:

- `packages/registry/`: The source of truth for all components. It compiles to a `registry.json` file which the CLI consumes.
- `packages/cli/`: The command-line tool that fetches components from the registry and injects them into user projects.
- `apps/showcase/`: A local React application used to develop, test, and showcase the components.

### Modifying the Theme

All colors, spacing, borders, typography, and shadows are controlled by native CSS Variables in your global `index.css` file. 
Simply edit the `:root` and `@media (prefers-color-scheme: dark)` blocks to completely rebrand all components at once.

---

## 🛠️ Contributing and Development

Want to add new components or modify the CLI?

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the showcase app** to see components in action:
   ```bash
   npm run start --workspace=apps/showcase
   ```
4. **Build the Registry** after modifying a component in `packages/registry`:
   ```bash
   npm run build --workspace=packages/registry
   ```
5. **Rebuild the CLI** if you modify `packages/cli/src/index.ts`:
   ```bash
   npm run build --workspace=packages/cli
   ```

## 📝 License

MIT © PattemChaitanya
