function deepMerge(target, source) {
  if (typeof target !== "object" || target === null) {
    return source;
  }

  if (typeof source !== "object" || source === null) {
    return target;
  }

  const merged = Array.isArray(target) ? [...target] : { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === "object" && source[key] !== null) {
        if (!target[key]) {
          merged[key] = source[key];
        } else {
          merged[key] = deepMerge(target[key], source[key]);
        }
      } else {
        merged[key] = source[key];
      }
    }
  }

  return merged;
}

module.exports = deepMerge;

// import deepmerge from '@mui/utils/deepmerge';
// import cssVarsParser from './cssVarsParser';

// function prepareCssVars(theme, parserConfig) {
//   const { colorSchemes = {}, components, defaultColorScheme = 'light', ...otherTheme } = theme;
//   const {
//     vars: rootVars,
//     css: rootCss,
//     varsWithDefaults: rootVarsWithDefaults,
//   } = cssVarsParser(otherTheme, parserConfig);
//   let themeVars = rootVarsWithDefaults;

//   const colorSchemesMap = {};
//   const { [defaultColorScheme]: light, ...otherColorSchemes } = colorSchemes;
//   Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
//     const { vars, css, varsWithDefaults } = cssVarsParser(scheme, parserConfig);
//     themeVars = deepmerge(themeVars, varsWithDefaults);
//     colorSchemesMap[key] = { css, vars };
//   });
//   if (light) {
//     // default color scheme vars should be merged last to set as default
//     const { css, vars, varsWithDefaults } = cssVarsParser(light, parserConfig);
//     themeVars = deepmerge(themeVars, varsWithDefaults);
//     colorSchemesMap[defaultColorScheme] = { css, vars };
//   }

//   const generateCssVars = (colorScheme) => {
//     if (!colorScheme) {
//       const css = { ...rootCss };
//       return {
//         css,
//         vars: rootVars,
//         selector: parserConfig?.getSelector?.(colorScheme, css) || ':root',
//       };
//     }
//     const css = { ...colorSchemesMap[colorScheme].css };
//     return {
//       css,
//       vars: colorSchemesMap[colorScheme].vars,
//       selector: parserConfig?.getSelector?.(colorScheme, css) || ':root',
//     };
//   };

//   return {
//     vars: themeVars,
//     generateCssVars,
//   };
// }

// export default prepareCssVars;
