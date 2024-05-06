import { json } from "@remix-run/node";
import base64toFile from 'node-base64-to-file';
import fs from 'fs'

import type { ActionFunctionArgs } from "@remix-run/node";

import { imageColor as statImageColor } from '~/utils/color/stat'
import { imageColor as vibRantImageColor } from '~/utils/color/color-vibrant'

// 非 get
export const action = async ({ request }: ActionFunctionArgs) => {
  let imageData = ''
  let type = 'stat' as 'stat' | 'vibrant'
  try {
    const body = await request.json();
    imageData = body.imageData
    type = body.type || 'stat'
  } catch(err) {
    console.log('/api/color 请求解析错误', err)
    return json({ code: 1, message: "请求解析错误" });
  }

  let parseResult = null
  if (type === 'stat') {
    parseResult = await statImageColor(imageData)
  } else if (type === 'vibrant') {
    
    const imagePath = (await base64toFile(imageData, { filePath: '.' })) as string

    parseResult = await vibRantImageColor(imagePath)

    fs.unlinkSync(imagePath)
  }

  if (!parseResult) {
    return json({ code: 2, message: "url 解析错误" });
  }

  return json({ code: 0, data: parseResult , message: "解析成功" });
};
