import { ChangeEvent } from "react";

import { useImageData } from "~/utils/store";

export const ImgUpload = () => {
  const setImage = useImageData.use.setImage();
  const image = useImageData.use.image();
  const imageLoadedCallback = useImageData.use.imageLoadedCallback();
  const clear = useImageData.use.clear();
  const mainColor = useImageData.use.mainColor();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (typeof data !== "string") return;
      console.log("load");
      setImage(data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <div 
          className="p-8 border-2 rounded-lg mt-4 relative"
          style={{
            backgroundColor: mainColor ? mainColor : "transparent",
          }}
        >
          <img
            className="aspect-auto max-w-80 max-h-80 rounded-lg"
            src={image}
            alt="preview img"
            id="preview-img"
            onLoad={() => {
              console.log("image loaded", imageLoadedCallback);
              imageLoadedCallback.forEach((cb) => cb());
            }}
          />
          {/* delete img  */}
          <button
            className="px-2 py-1 mt-4 text-white bg-red-400 rounded-lg text-xs absolute top-0 right-1"
            onClick={() => clear()}
          >
            X
          </button>
        </div>
      ) : (
        <div className="w-72 p-4 rounded-lg mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
            htmlFor="file_input"
          >
            选择图片文件
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-48 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
