import decode from 'image-decode';

import { toHex } from './tools'

/**
 * 获取图片的主色调
 * @param { String | Buffer } img base64 图片或者 buffer
 * @returns { Object } 主色调数据
 */
export const imageColor = async (img: string | Buffer) => {
  if (img == null) {
    throw new Error('Error: img is a required parameter');
  }

  const srcData = decode(img);

  if (!srcData?.data) {
    throw new Error('Error: Invalid image source; unable to decode');
  }

  const { data } = srcData;
  const COLOR_MAP: {
    [key: string]: number;
  } = {};

  for (let i = 0; i < data.length; i += 4) {
    /* don't count trasparent pixels, it's boring */
    if (data[i + 3] === 0) continue;

    const color = `${data[i + 0]}+${data[i + 1]}+${data[i + 2]}`;
    if (COLOR_MAP[color]) COLOR_MAP[color] = COLOR_MAP[color] + 1;
    else COLOR_MAP[color] = 1;
  }

  const colorKeys = Object.keys(COLOR_MAP);

  // nothing to sort
  if (!colorKeys?.length) return;

  const _rgb = colorKeys.reduce((f, g) =>
    COLOR_MAP[f] > COLOR_MAP[g] ? f : g,
  );

  const rgb = _rgb.split('+').map((e) => +e);
  const hex = toHex(rgb);
  const count = COLOR_MAP[_rgb];
  const total = Math.round(data.length / 4);

  return { rgb, hex, count, total };
};
