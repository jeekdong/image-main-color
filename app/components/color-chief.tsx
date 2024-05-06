import { useEffect, useState } from "react";

import { useImageData } from "~/utils/store";

import { imageColor } from "~/utils/color/color-thief";

export function ColorChief() {
  const [mainColor, setMainColor] = useState("");
  const [loading, setLoading] = useState(false);
  const image = useImageData.use.image();
  const setBgColor = useImageData.use.setMainColor();
  const addImageLoadedCallback = useImageData.use.addImageLoadedCallback();

  const getImageColor = async () => {
    if (!document.getElementById("preview-img")) return;
    setLoading(true);
    const color = imageColor(document.getElementById("preview-img")!);
    console.log("chief color", color);
    setLoading(false);
    if (color) {
      setMainColor(color.hex);
    }
  };

  useEffect(() => {
    const removeImageLoadedCallback = addImageLoadedCallback(getImageColor);
    return () => {
      removeImageLoadedCallback();
    };
  }, [addImageLoadedCallback]);

  return (
    <div className="main-color-box">
      <h2>color-chief</h2>
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
