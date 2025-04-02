function generateResponsiveTypography(breakpoints, typographyOptions) {
  const typography = {};

  Object.keys(breakpoints).forEach((breakpoint) => {
    typography[breakpoint] = {};

    Object.keys(typographyOptions).forEach((typographyOption) => {
      typography[breakpoint][typographyOption] = {};

      Object.keys(typographyOptions[typographyOption]).forEach((property) => {
        typography[breakpoint][typographyOption][property] =
          typographyOptions[typographyOption][property];
      });
    });
  });

  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `:root { ${typography} }`;
    document.head.appendChild(style);
  }

  return typography;
}

export default generateResponsiveTypography;
