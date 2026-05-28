function generateCssVariables(theme) {
  const cssClasses = {};

  function createCssVariables(selector, styles) {
    return `${selector}: ${styles}`;
  }

  function processThemeObject(obj, parentKey = "") {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        processThemeObject(obj[key], `${parentKey}-${key}`);
      } else {
        const className = parentKey ? `${parentKey}-${key}` : key;
        cssClasses[className] = obj[key];
      }
    }
  }

  processThemeObject(theme);

  const cssString = Object.entries(cssClasses)
    .map(([className, styles]) => createCssVariables(`-${className}`, styles))
    .join("\n");

  return cssString;
}

// Example usage
const theme = {
  palette: {
    primary: {
      main: "#1976d2",
      light: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
      light: "#dc004e",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
    },
  },
};

const cssClasses = generateCssVariables(theme);
console.log(cssClasses);
