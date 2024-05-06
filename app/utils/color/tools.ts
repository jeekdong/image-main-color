export function toHex(rgb: string[] | number[]) {
  rgb = rgb.map((e) => e.toString(16));
  rgb = rgb.map((e) => (e.length > 1 ? '' : '0') + e);
  return `${rgb.join('')}`;
}
