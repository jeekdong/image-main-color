import { useEffect, useState } from "react";

import { useImageData } from "~/utils/store";

export function ColorStat() {
  const [mainColor, setMainColor] = useState("");
  const [percent, setPercent] = useState(0);
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
      body: JSON.stringify({ imageData: _image }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 0) {
          return res.data;
        }
      })
    console.log("stat color", color);
    setLoading(false);
    if (color) {
      setMainColor(color.hex);
      setPercent((color.count / color.total) * 100);
    }
  };

  useEffect(() => {
    getImageColor(image);
  }, [image]);

  return (
    <div className="main-color-box">
        <h2>统计法</h2>
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
                    <div>主色占比：{percent.toFixed(2)}%</div>
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
