// Convert Hex to RGB
export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Apply full theme from a single primary color
export const applyThemeColor = (hex: string) => {
  const root = document.documentElement;
  
  // Set base primary
  root.style.setProperty('--primary', hex);
  
  // Generate hover (slightly darker/lighter)
  // Our CSS uses color-mix(in srgb, var(--primary) 88%, black), but for full compatibility we can explicitly set it
  // But wait, the easiest and most robust way is to just set the RGB values if we use rgb(var(--primary-rgb))
  // Since we use hex directly in --primary, let's also inject the raw values so the CSS `color-mix` definitely works,
  // or explicitly set the subtle/hover variables in JS.
  
  // Actually, setting --primary is usually enough for modern browsers with color-mix, but maybe the 
  // Customizer didn't work because `color-mix` failed in their specific browser?
  // Let's explicitly set the derived colors just in case!
  
  const rgb = hexToRgb(hex);
  if (rgb) {
    // A simple way to simulate color-mix 88% primary, 12% black for hover
    const hoverHex = `#${Math.floor(rgb.r * 0.88).toString(16).padStart(2, '0')}${Math.floor(rgb.g * 0.88).toString(16).padStart(2, '0')}${Math.floor(rgb.b * 0.88).toString(16).padStart(2, '0')}`;
    root.style.setProperty('--primary-hover', hoverHex);
    
    // Simulate color-mix 12% primary, 88% transparent for subtle background
    const subtleRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
    root.style.setProperty('--primary-subtle', subtleRgba);
    
    // Set text-on-primary to white or black based on luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    root.style.setProperty('--primary-foreground', luminance > 0.5 ? '#000000' : '#ffffff');
  }
};
