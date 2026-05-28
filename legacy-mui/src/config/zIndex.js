function generateZIndex(zIndices) {
  const cssRules = Object.entries(zIndices)
    .map(([component, zIndex]) => {
      const selector = `[data-mui-${component}]`;
      const styleRules = `z-index: ${zIndex};`;
      return `${selector} { ${styleRules} }`;
    })
    .join(" ");

  const style = `<style>${cssRules}</style>`;
  typeof document !== "undefined" && (document.head.innerHTML += style);

  return zIndices;
}

const zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

const zIndices = generateZIndex(zIndex);
export default zIndices;
