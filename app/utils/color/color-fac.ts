import { FastAverageColor } from 'fast-average-color';

export const imageColor = async (imageDom: HTMLImageElement) => {
  if (!imageDom) {
    throw new Error('Error: imageDom is a required parameter');
  }

  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(imageDom);

  return color;
};
