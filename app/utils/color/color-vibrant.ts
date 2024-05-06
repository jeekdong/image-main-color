import Vibrant from 'node-vibrant/lib/index.js'

export const imageColor = async (imageData: string) => {
  const v = new Vibrant(imageData)
  const color = await v.getPalette()
  return color
}