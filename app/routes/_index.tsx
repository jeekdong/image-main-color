import type { MetaFunction } from "@remix-run/node";

import { ImgUpload } from '~/components/img-upload'
import { ColorStat } from '~/components/color-stat'
import { ColorChief } from '~/components/color-chief'
import { ColorFac } from '~/components/color-fac'
import { ColorVibrant } from '~/components/color-vibrant'

export const meta: MetaFunction = () => {
  return [
    { title: "get image main color" },
    { name: "description", content: "get image main color" },
  ];
};

export default function Index() {
  return (
    <div className="p-4">
      <ImgUpload />
      <div className="flex justify-between w-full max-w-7xl">
        <ColorStat />
        <ColorChief />
        <ColorFac />
        <ColorVibrant />
      </div>
    </div>
  );
}
