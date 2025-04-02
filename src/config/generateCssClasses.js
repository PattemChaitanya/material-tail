function generateCssClasses(components) {
  const cssRules = Object.entries(components)
    .map(([component, styles]) => {
      const className = `.${component}`;
      const styleRules = Object.entries(styles.styleOverrides.root)
        .map(([property, value]) => `${property}: ${value};`)
        .join(" ");

      return `${className} { ${styleRules} }`;
    })
    .join(" ");

  const style = `<style>${cssRules}</style>`;
  typeof document !== "undefined" && (document.head.innerHTML += style);

  return cssRules;
}

const components = {
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: "1200px",
      },
    },
  },
  MuiBox: {
    styleOverrides: {
      root: {
        margin: "8px",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: "#333",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: "16px",
      },
    },
  },
};

const classes = generateCssClasses(components);
console.log(classes);
