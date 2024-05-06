import { useEffect, useState } from "react";

import { useImageData } from "~/utils/store";
import { toHex } from "~/utils/color/tools";

export function ColorVibrant() {
  const [mainColor, setMainColor] = useState("");
  const [loading, setLoading] = useState(false);
  const image = useImageData.use.image();
  const setBgColor = useImageData.use.setMainColor();

  const getImageColor = async (_image: string) => {
    if (!_image) return;
    setLoading(true);
    const color = await fetch("/api/color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData: _image, type: "vibrant" }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 0) {
          return res.data;
        }
      });
    console.log("vibrant color", color);
    setLoading(false);
    if (color) {
      setMainColor(toHex(color.LightMuted?.rgb || []));
    }
  };

  useEffect(() => {
    getImageColor(image);
  }, [image]);

  return (
    <div className="main-color-box">
      <h2>node-vibrant</h2>
      {image ? (
        <>
          {loading ? (
            "计算中..."
          ) : (
            <>
              {mainColor ? (
                <>
                  <div
                    className="w-36 h-36 rounded-lg border-2"
                    style={{
                      backgroundColor: `#${mainColor}`,
                    }}
                  />
                  <button
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    onClick={() => {
                      setBgColor(`#${mainColor}`);
                    }}
                  >
                    应用
                  </button>
                  <div>主色：#{mainColor}</div>
                </>
              ) : null}
            </>
          )}
        </>
      ) : (
        "请上传图片"
      )}
    </div>
  );
}
