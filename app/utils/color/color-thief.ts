import ColorThief from 'colorthief'

import { toHex } from './tools'

export const imageColor = (imageDom: HTMLElement) => {
  const colorThief = new ColorThief();
  const colors = colorThief.getColor(imageDom);
  const hex = toHex(colors);
  return { rgb: colors, hex };
}