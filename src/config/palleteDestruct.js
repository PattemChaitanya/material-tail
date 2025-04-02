const palette = {
  primary: {
    main: "#007bff",
    light: "#5bc0de",
    dark: "#0056b3",
  },
  secondary: {
    main: "#6B7280",
    light: "#9ca3af",
    dark: "#4B5563",
  },
  error: {
    main: "#ef4444",
    light: "#f3acf2",
    dark: "#b91c1c",
  },
  warning: {
    main: "#f59e0b",
    light: "#fde68a",
    dark: "#c67800",
  },
  info: {
    main: "#3b82f6",
    light: "#a3acf2",
    dark: "#1f3d4e",
  },
  success: {
    main: "#3b82f6",
    light: "#a3acf2",
    dark: "#1f3d4e",
  },
};

const cssVars = Object.entries(palette)
  .map(([key, value]) => {
    return Object.entries(value)
      .map(([subKey, color]) => {
        return `--${key}-${subKey}: ${color};`;
      })
      .join(" ");
  })
  .join(" ");

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `:root { ${cssVars} }`;
  document.head.appendChild(style);
}
