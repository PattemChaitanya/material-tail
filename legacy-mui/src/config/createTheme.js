const defaultTheme = require("./defaultTheme");
const deepMerge = require("./deepMerge");
// import deepMerge from "./deepMerge";

const customObject = {
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 4,
  },
};

function createTheme(customTheme) {
  // const { palette, typography, components, ...rest } = customTheme;

  const mergedTheme = deepMerge(defaultTheme, customTheme);

  console.log(mergedTheme);
  return mergedTheme;
}

// export default createTheme;
createTheme(customObject);
