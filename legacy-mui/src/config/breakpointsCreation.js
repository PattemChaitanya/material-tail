const breakpoints = {
  xs: "@media (max-width: 599px)",
  sm: "@media (min-width: 600px) and (max-width: 899px)",
  md: "@media (min-width: 900px) and (max-width: 1199px)",
  lg: "@media (min-width: 1200px) and (max-width: 1399px)",
  xl: "@media (min-width: 1400px)",
};

const generateMediaQueries = (breakpoints) => {
  const mediaQueries = Object.entries(breakpoints)
    .map(([breakpoint, query]) => {
      return `${query} { /* Styles here */ }`;
    })
    .join(" ");
  return mediaQueries;
};

const mediaQueries = generateMediaQueries(breakpoints);

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = mediaQueries;
  document.head.appendChild(style);
}
