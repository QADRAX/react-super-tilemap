export function isValidCSSColor(color?: string): boolean {
  if (!color) {
    return false;
  }

  return CSS.supports('color', color);
}