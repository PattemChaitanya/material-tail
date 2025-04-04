const componentsWithHtmlTags = {
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

const destructuredComponents = Object.entries(componentsWithHtmlTags).map(
  ([component, styles]) => {
    const { styleOverrides } = styles;
    const { root } = styleOverrides;
    return {
      [component]: {
        ...root,
        styles: generateCssClasses({ [component]: styles }),
      },
    };
  }
);

console.log(destructuredComponents);

/**
 * This function create an object from keys, value and then assign to target
 *
 * @param {Object} obj : the target object to be assigned
 * @param {string[]} keys
 * @param {string | number} value
 *
 * @example
 * const source = {}
 * assignNestedKeys(source, ['palette', 'primary'], 'var(--palette-primary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)' } }
 *
 * @example
 * const source = { palette: { primary: 'var(--palette-primary)' } }
 * assignNestedKeys(source, ['palette', 'secondary'], 'var(--palette-secondary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)', secondary: 'var(--palette-secondary)' } }
 */
function assignNestedKeys(obj, keys, value, arrayKeys = []) {
  let temp = obj;
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      if (Array.isArray(temp)) {
        temp[Number(k)] = value;
      } else if (temp && typeof temp === "object") {
        temp[k] = value;
      }
    } else if (temp && typeof temp === "object") {
      if (!temp[k]) {
        temp[k] = arrayKeys.includes(k) ? [] : {};
      }
      temp = temp[k];
    }
  });
}

/**
 *
 * @param {Object} obj : source object
 * @param {Function} callback : a function that will be called when
 *                   - the deepest key in source object is reached
 *                   - the value of the deepest key is NOT `undefined` | `null`
 *
 * @example
 * walkObjectDeep({ palette: { primary: { main: '#000000' } } }, console.log)
 * // ['palette', 'primary', 'main'] '#000000'
 */
function walkObjectDeep(obj, callback, shouldSkipPaths) {
  function recurse(object, parentKeys = [], arrayKeys = []) {
    Object.entries(object).forEach(([key, value]) => {
      if (
        !shouldSkipPaths ||
        (shouldSkipPaths && !shouldSkipPaths([...parentKeys, key]))
      ) {
        if (value !== undefined && value !== null) {
          if (typeof value === "object" && Object.keys(value).length > 0) {
            recurse(
              value,
              [...parentKeys, key],
              Array.isArray(value) ? [...arrayKeys, key] : arrayKeys
            );
          } else {
            callback([...parentKeys, key], value, arrayKeys);
          }
        }
      }
    });
  }
  recurse(obj);
}

function getCssValue(keys, value) {
  if (typeof value === "number") {
    if (
      ["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) =>
        keys.includes(prop)
      )
    ) {
      // CSS property that are unitless
      return value;
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey.toLowerCase().indexOf("opacity") >= 0) {
      // opacity values are unitless
      return value;
    }
    return `${value}px`;
  }
  return value;
}

/**
 * a function that parse theme and return { css, vars }
 *
 * @param {Object} theme
 * @param {{
 *  prefix?: string,
 *  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean
 * }} options.
 *  `prefix`: The prefix of the generated CSS variables. This function does not change the value.
 *
 * @returns {{ css: Object, vars: Object }} `css` is the stylesheet, `vars` is an object to get css variable (same structure as theme).
 *
 * @example
 * const { css, vars } = parser({
 *   fontSize: 12,
 *   lineHeight: 1.2,
 *   palette: { primary: { 500: 'var(--color)' } }
 * }, { prefix: 'foo' })
 *
 * console.log(css) // { '--foo-fontSize': '12px', '--foo-lineHeight': 1.2, '--foo-palette-primary-500': 'var(--color)' }
 * console.log(vars) // { fontSize: 'var(--foo-fontSize)', lineHeight: 'var(--foo-lineHeight)', palette: { primary: { 500: 'var(--foo-palette-primary-500)' } } }
 */
function cssVarsParser(theme, options) {
  const { prefix, shouldSkipGeneratingVar } = options || {};
  const css = {};
  const vars = {};
  const varsWithDefaults = {};

  walkObjectDeep(
    theme,
    (keys, value, arrayKeys) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!shouldSkipGeneratingVar || !shouldSkipGeneratingVar(keys, value)) {
          // only create css & var if `shouldSkipGeneratingVar` return false
          const cssVar = `--${prefix ? `${prefix}-` : ""}${keys.join("-")}`;
          Object.assign(css, { [cssVar]: getCssValue(keys, value) });

          assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
          assignNestedKeys(
            varsWithDefaults,
            keys,
            `var(${cssVar}, ${value})`,
            arrayKeys
          );
        }
      }
    },
    (keys) => keys[0] === "vars" // skip 'vars/*' paths
  );

  return { css, vars, varsWithDefaults };
}
