#!/usr/bin/env node
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import prompts from "prompts";

const program = new Command();
const CONFIG_FILE = "material-tail.json";
const DEFAULT_REGISTRY_URL =
  "https://raw.githubusercontent.com/PattemChaitanya/material-tail/main/packages/registry/dist/registry.json";

interface Config {
  componentsPath: string;
  libPath: string;
  stylesPath: string;
  registryUrl: string;
}

// ============================================================
// COMPLETE THEME TOKEN SYSTEM
// This gets injected into the user's global CSS on `init`.
// All colors, spacing, typography, shadows, transitions,
// z-index, and radii — everything components reference.
// ============================================================
const DEFAULT_THEME_CSS = `
/* ============================================================
   material-tail — Design Tokens
   Edit these variables to theme all components at once.
   ============================================================ */

/* --- material-tail-theme-start --- */
:root {
  /* ----------------------------------------------------------
     COLOR PALETTE
     Components reference these. Change here to retheme all.
     ---------------------------------------------------------- */

  /* Primary */
  --primary:            #1976d2;
  --primary-foreground: #ffffff;
  --primary-hover:      color-mix(in srgb, var(--primary) 88%, black);
  --primary-subtle:     color-mix(in srgb, var(--primary) 12%, transparent);

  /* Secondary */
  --secondary:            #9c27b0;
  --secondary-foreground: #ffffff;
  --secondary-hover:      color-mix(in srgb, var(--secondary) 88%, black);
  --secondary-subtle:     color-mix(in srgb, var(--secondary) 12%, transparent);

  /* Error */
  --error:            #d32f2f;
  --error-foreground: #ffffff;
  --error-hover:      color-mix(in srgb, var(--error) 88%, black);
  --error-subtle:     color-mix(in srgb, var(--error) 12%, transparent);

  /* Warning */
  --warning:            #ed6c02;
  --warning-foreground: #ffffff;
  --warning-hover:      color-mix(in srgb, var(--warning) 88%, black);
  --warning-subtle:     color-mix(in srgb, var(--warning) 12%, transparent);

  /* Info */
  --info:            #0288d1;
  --info-foreground: #ffffff;
  --info-hover:      color-mix(in srgb, var(--info) 88%, black);
  --info-subtle:     color-mix(in srgb, var(--info) 12%, transparent);

  /* Success */
  --success:            #2e7d32;
  --success-foreground: #ffffff;
  --success-hover:      color-mix(in srgb, var(--success) 88%, black);
  --success-subtle:     color-mix(in srgb, var(--success) 12%, transparent);

  /* ----------------------------------------------------------
     NEUTRALS
     ---------------------------------------------------------- */
  --background:         #ffffff;
  --background-paper:   #ffffff;
  --background-subtle:  #f5f5f5;

  --text-primary:       rgba(0, 0, 0, 0.87);
  --text-secondary:     rgba(0, 0, 0, 0.6);
  --text-disabled:      rgba(0, 0, 0, 0.38);
  --text-placeholder:   rgba(0, 0, 0, 0.38);

  --border-color:       rgba(0, 0, 0, 0.23);
  --divider:            rgba(0, 0, 0, 0.12);

  --action-hover:             rgba(0, 0, 0, 0.04);
  --action-selected:          rgba(0, 0, 0, 0.08);
  --action-disabled-bg:       rgba(0, 0, 0, 0.12);
  --color-focus-ring:         var(--primary);

  /* Input-specific */
  --input-filled-bg:          rgba(0, 0, 0, 0.06);
  --input-filled-bg-hover:    rgba(0, 0, 0, 0.09);

  /* ----------------------------------------------------------
     TYPOGRAPHY
     ---------------------------------------------------------- */
  --font-family:          system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
                          Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-mono:     ui-monospace, "Cascadia Code", "Source Code Pro",
                          Menlo, Consolas, "DejaVu Sans Mono", monospace;

  --font-size-xs:   0.75rem;    /* 12px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-md:   1rem;       /* 16px */
  --font-size-lg:   1.125rem;   /* 18px */
  --font-size-xl:   1.25rem;    /* 20px */
  --font-size-2xl:  1.5rem;     /* 24px */
  --font-size-3xl:  1.875rem;   /* 30px */
  --font-size-4xl:  2.25rem;    /* 36px */

  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:    1.25;
  --line-height-normal:   1.5;
  --line-height-relaxed:  1.75;

  /* ----------------------------------------------------------
     SPACING SCALE  (base unit = 4px)
     ---------------------------------------------------------- */
  --spacing-0:   0px;
  --spacing-1:   4px;
  --spacing-2:   8px;
  --spacing-3:   12px;
  --spacing-4:   16px;
  --spacing-5:   20px;
  --spacing-6:   24px;
  --spacing-8:   32px;
  --spacing-10:  40px;
  --spacing-12:  48px;
  --spacing-16:  64px;

  /* ----------------------------------------------------------
     BORDER RADIUS
     ---------------------------------------------------------- */
  --radius-none:  0px;
  --radius-sm:    2px;
  --radius-md:    4px;
  --radius-lg:    8px;
  --radius-xl:    12px;
  --radius-2xl:   16px;
  --radius-full:  9999px;

  /* ----------------------------------------------------------
     SHADOWS / ELEVATION
     ---------------------------------------------------------- */
  --shadow-none:  none;
  --shadow-sm:    0px 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md:    0px 2px 4px rgba(0, 0, 0, 0.1),
                  0px 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-lg:    0px 4px 8px rgba(0, 0, 0, 0.12),
                  0px 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-xl:    0px 8px 16px rgba(0, 0, 0, 0.12),
                  0px 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-2xl:   0px 16px 32px rgba(0, 0, 0, 0.15);

  /* ----------------------------------------------------------
     TRANSITIONS
     ---------------------------------------------------------- */
  --transition-fast:    150ms ease;
  --transition-normal:  200ms ease;
  --transition-slow:    300ms ease;
  --transition-spring:  300ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ----------------------------------------------------------
     Z-INDEX SCALE
     ---------------------------------------------------------- */
  --z-below:      -1;
  --z-base:        0;
  --z-raised:      1;
  --z-dropdown:  1000;
  --z-sticky:    1100;
  --z-overlay:   1200;
  --z-modal:     1300;
  --z-popover:   1400;
  --z-tooltip:   1500;
  --z-toast:     1600;
}

/* ----------------------------------------------------------
   DARK MODE — override the tokens that change in dark mode
   ---------------------------------------------------------- */
@media (prefers-color-scheme: dark) {
  :root {
    --background:           #121212;
    --background-paper:     #1e1e1e;
    --background-subtle:    #2a2a2a;

    --text-primary:         rgba(255, 255, 255, 0.87);
    --text-secondary:       rgba(255, 255, 255, 0.6);
    --text-disabled:        rgba(255, 255, 255, 0.38);
    --text-placeholder:     rgba(255, 255, 255, 0.38);

    --border-color:         rgba(255, 255, 255, 0.23);
    --divider:              rgba(255, 255, 255, 0.12);

    --action-hover:         rgba(255, 255, 255, 0.08);
    --action-selected:      rgba(255, 255, 255, 0.12);
    --action-disabled-bg:   rgba(255, 255, 255, 0.12);

    --input-filled-bg:      rgba(255, 255, 255, 0.09);
    --input-filled-bg-hover: rgba(255, 255, 255, 0.13);
  }
}
/* --- material-tail-theme-end --- */
`;

// The cp() utility — written to lib/utils.ts in the user's project
const CN_UTILITY_TS = `/**
 * cp — class name utility
 *
 * A lightweight helper to compose conditional class names.
 * Filters out falsy values (false, null, undefined, 0, "") and
 * joins the remaining strings with a space.
 *
 * Usage:
 *   cp("base-class", isActive && "active", hasError && "error")
 *   cp(styles.button, fullWidth && styles["full-width"], className)
 */
export function cp(
  ...classes: (string | false | null | undefined | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
`;

async function fetchRegistry(registryUrl: string): Promise<any[]> {
  if (
    registryUrl.startsWith("http://") ||
    registryUrl.startsWith("https://")
  ) {
    const response = await fetch(registryUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch registry from ${registryUrl}: ${response.statusText}`
      );
    }
    return (await response.json()) as any[];
  } else {
    const resolvedPath = path.resolve(registryUrl);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Local registry file not found at ${resolvedPath}`);
    }
    const content = fs.readFileSync(resolvedPath, "utf-8");
    return JSON.parse(content);
  }
}

program
  .name("material-tail")
  .description(
    "CLI to copy custom CSS Modules components into your React project"
  )
  .version("1.0.0");

// ============================================================
// COMMAND: init
// ============================================================
program
  .command("init")
  .description("Initialize configuration and styling variables in your project")
  .option("-y, --yes", "Skip prompts and use defaults")
  .action(async (options) => {
    console.log("Initializing Material-Tail...\n");

    let componentsPath = "src/components/ui";
    let libPath = "src/lib";
    let stylesPath = "src/index.css";
    let registryUrl = DEFAULT_REGISTRY_URL;

    if (!options.yes) {
      const response = await prompts([
        {
          type: "text",
          name: "componentsPath",
          message: "Where would you like to install components?",
          initial: componentsPath,
        },
        {
          type: "text",
          name: "libPath",
          message: "Where would you like to place the lib utilities (cn)?",
          initial: libPath,
        },
        {
          type: "text",
          name: "stylesPath",
          message: "Where is your global CSS file?",
          initial: stylesPath,
        },
        {
          type: "text",
          name: "registryUrl",
          message: "Registry URL (leave blank for default GitHub-hosted):",
          initial: registryUrl,
        },
      ]);

      if (response.componentsPath !== undefined)
        componentsPath = response.componentsPath;
      if (response.libPath !== undefined) libPath = response.libPath;
      if (response.stylesPath !== undefined) stylesPath = response.stylesPath;
      if (response.registryUrl !== undefined)
        registryUrl = response.registryUrl;
    }

    const config: Config = { componentsPath, libPath, stylesPath, registryUrl };

    // 1. Write config file
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    console.log(`✓ Created ${CONFIG_FILE}`);

    // 2. Create components folder
    const compDir = path.resolve(componentsPath);
    if (!fs.existsSync(compDir)) {
      fs.mkdirSync(compDir, { recursive: true });
      console.log(`✓ Created components directory: ${componentsPath}`);
    }

    // 3. Create lib folder and write cp() utility
    const libDir = path.resolve(libPath);
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }
    const utilsFilePath = path.join(libDir, "utils.ts");
    fs.writeFileSync(utilsFilePath, CN_UTILITY_TS, "utf-8");
    console.log(`✓ Created ${path.relative(process.cwd(), utilsFilePath)}`);

    // 4. Inject theme tokens into global CSS
    const resolvedCssPath = path.resolve(stylesPath);
    const cssDir = path.dirname(resolvedCssPath);
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true });
    }

    let existingCssContent = "";
    if (fs.existsSync(resolvedCssPath)) {
      existingCssContent = fs.readFileSync(resolvedCssPath, "utf-8");
    }

    if (existingCssContent.includes("material-tail-theme-start")) {
      console.log(`ℹ Theme tokens already present in ${stylesPath} — skipped.`);
    } else {
      const separator = existingCssContent ? "\n" : "";
      fs.writeFileSync(
        resolvedCssPath,
        existingCssContent + separator + DEFAULT_THEME_CSS,
        "utf-8"
      );
      console.log(`✓ Injected design tokens into ${stylesPath}`);
    }

    console.log(
      "\nSetup complete! Add your first component:\n  npx material-tail add button"
    );
  });

// ============================================================
// COMMAND: add
// ============================================================
program
  .command("add")
  .description("Add one or more components to your project")
  .argument("<components...>", "Component name(s) to add (e.g. button input)")
  .option("--overwrite", "Overwrite existing component files without prompting")
  .action(async (componentNames: string[], options) => {
    if (!fs.existsSync(CONFIG_FILE)) {
      console.error(
        `\nError: ${CONFIG_FILE} not found. Please run "npx material-tail init" first.\n`
      );
      process.exit(1);
    }

    const configContent = fs.readFileSync(CONFIG_FILE, "utf-8");
    const config: Config = JSON.parse(configContent);

    console.log(`\nFetching registry from: ${config.registryUrl}...`);
    let registry: any[];
    try {
      registry = await fetchRegistry(config.registryUrl);
    } catch (e: any) {
      console.error(`\nError fetching registry: ${e.message}\n`);
      process.exit(1);
    }

    // Resolve all requested components (and their registryDependencies)
    const toInstall = new Set<string>();

    function resolve(name: string) {
      if (toInstall.has(name)) return;
      const entry = registry.find((e) => e.name === name.toLowerCase());
      if (!entry) {
        console.error(`\nError: Component "${name}" not found in registry.`);
        console.log(
          `Available: ${registry.map((e) => e.name).join(", ")}\n`
        );
        process.exit(1);
      }
      toInstall.add(name.toLowerCase());
      // Recursively resolve declared registry dependencies
      if (entry.registryDependencies && Array.isArray(entry.registryDependencies)) {
        for (const dep of entry.registryDependencies) {
          resolve(dep);
        }
      }
    }

    for (const name of componentNames) {
      resolve(name);
    }

    const destBaseDir = path.resolve(config.componentsPath);

    for (const componentName of toInstall) {
      const entry = registry.find((e) => e.name === componentName);
      console.log(`\nInstalling: ${entry.name}`);

      for (const file of entry.files) {
        const destFilePath = path.join(destBaseDir, file.path);
        const destFileDir = path.dirname(destFilePath);

        if (!fs.existsSync(destFileDir)) {
          fs.mkdirSync(destFileDir, { recursive: true });
        }

        const exists = fs.existsSync(destFilePath);
        if (exists && !options.overwrite) {
          // Prompt user whether to overwrite
          const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: `  ${path.relative(process.cwd(), destFilePath)} already exists. Overwrite?`,
            initial: false,
          });
          if (!overwrite) {
            console.log(`  ~ Skipped ${path.relative(process.cwd(), destFilePath)}`);
            continue;
          }
        }

        fs.writeFileSync(destFilePath, file.content, "utf-8");
        console.log(
          `  ${exists ? "↺" : "+"} ${path.relative(process.cwd(), destFilePath)}`
        );
      }
    }

    console.log("\n✓ Done!\n");
  });

// ============================================================
// COMMAND: list
// ============================================================
program
  .command("list")
  .description("List all available components in the registry")
  .action(async () => {
    if (!fs.existsSync(CONFIG_FILE)) {
      console.error(
        `\nError: ${CONFIG_FILE} not found. Please run "npx material-tail init" first.\n`
      );
      process.exit(1);
    }

    const configContent = fs.readFileSync(CONFIG_FILE, "utf-8");
    const config: Config = JSON.parse(configContent);

    let registry: any[];
    try {
      registry = await fetchRegistry(config.registryUrl);
    } catch (e: any) {
      console.error(`\nError fetching registry: ${e.message}\n`);
      process.exit(1);
    }

    console.log("\nAvailable components:\n");
    for (const entry of registry) {
      const desc = entry.description ? `  — ${entry.description}` : "";
      const deps =
        entry.registryDependencies?.length > 0
          ? ` (requires: ${entry.registryDependencies.join(", ")})`
          : "";
      console.log(`  ${entry.name}${deps}${desc}`);
    }
    console.log(
      `\n${registry.length} component(s) available. Add one with:\n  npx material-tail add <name>\n`
    );
  });

program.parse(process.argv);
