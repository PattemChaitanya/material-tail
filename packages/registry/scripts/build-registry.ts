import * as fs from "fs";
import * as path from "path";

const COMPONENTS_DIR = path.join(__dirname, "../src/components/ui");
const OUTPUT_DIR = path.join(__dirname, "../dist");

interface RegistryFile {
  path: string;
  content: string;
  type: string;
}

interface RegistryEntry {
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies?: string[];
  description?: string;
  files: RegistryFile[];
}

function getFilesRecursively(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      results.push(path.relative(baseDir, fullPath));
    }
  });
  return results;
}

function buildRegistry() {
  console.log("Building registry...");
  
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`Components directory not found at ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter((file) => {
    return fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory();
  });

  const registry: RegistryEntry[] = [];

  componentDirs.forEach((componentName) => {
    const componentPath = path.join(COMPONENTS_DIR, componentName);
    
    let meta: any = { dependencies: [], registryDependencies: [], description: "" };
    const metaPath = path.join(componentPath, "meta.json");
    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    }

    const files = getFilesRecursively(componentPath).filter(f => !f.endsWith("meta.json"));
    
    const registryFiles: RegistryFile[] = files.map((fileRelativePath) => {
      const fullPath = path.join(componentPath, fileRelativePath);
      const content = fs.readFileSync(fullPath, "utf-8");
      
      // The relative path from the user's components/ui directory, e.g. "Button/Button.tsx"
      const targetPath = path.join(componentName, fileRelativePath).replace(/\\/g, "/");
      
      let type = "registry:ui";
      if (fileRelativePath.endsWith(".tsx")) {
        type = "registry:ui";
      } else if (fileRelativePath.endsWith(".css")) {
        type = "registry:style";
      }

      return {
        path: targetPath,
        content,
        type,
      };
    });

    registry.push({
      name: componentName.toLowerCase(),
      type: "registry:ui",
      dependencies: meta.dependencies || [],
      registryDependencies: meta.registryDependencies || [],
      description: meta.description || "",
      files: registryFiles,
    });
  });

  const registryOutputPath = path.join(OUTPUT_DIR, "registry.json");
  fs.writeFileSync(registryOutputPath, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`Registry built successfully at ${registryOutputPath}`);
}

buildRegistry();
