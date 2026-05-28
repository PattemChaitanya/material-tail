/**
 * cp — class name utility
 *
 * A lightweight helper to compose conditional class names.
 * Filters out falsy values (false, null, undefined, 0, "") and
 * joins the remaining strings with a space.
 *
 * Usage:
 *   cp("base-class", isActive && "active", hasError && "error")
 *   cp(styles.button, fullWidth && styles["full-width"], className)
 */
export function cp(
  ...classes: (string | false | null | undefined | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
