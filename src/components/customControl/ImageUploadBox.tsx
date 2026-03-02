import { Plus, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./Input";
import { buildAssetUrl } from "../../utils/helper/asset.helper";
import { Image } from "./Image";

type Props = {
  value?: string;
  onFileChange?: (file: File | null) => void;
  disabled?: boolean;
  error?: string;

  multiple?: boolean;
  values?: string[];
  onFilesChange?: (files: File[]) => void;
  onRemoveLocal?: (index: number) => void;
  onRemoveServer?: (index: number) => void;

  variant?: "main" | "gallery";
  hideBadge?: boolean;
};

export default function ImageUploadBox({
  value = "",
  onFileChange,
  disabled,
  error,
  multiple = false,
  values = [],
  onFilesChange,
  onRemoveLocal,
  onRemoveServer,
  hideBadge = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const removeLocalPreview = (index: number) => {
    setPreviewUrls((prev) => {
      const next = prev.slice();
      const removed = next.splice(index, 1)[0];
      if (removed) URL.revokeObjectURL(removed);
      return next;
    });
  };

  const singleSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (value) return buildAssetUrl(value);
    return "";
  }, [value, previewUrl]);

  useEffect(() => {
    const currentPreviewUrl = previewUrl;
    return () => {
      if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (multiple) {
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
      setPreviewUrls([]);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    if (inputRef.current) inputRef.current.value = "";
  }, [value, multiple]);

  const serverList = useMemo(() => {
    if (!values?.length) return [];
    return values.map((v) => buildAssetUrl(v));
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    if (!multiple) {
      const file = picked[0];
      if (!file || !file.type.startsWith("image/")) return;

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileChange?.(file);
      e.target.value = "";
      return;
    }

    const imageFiles = picked.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const newUrls = imageFiles.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
    onFilesChange?.(imageFiles);
    e.target.value = "";
  };

  const renderImageItem = (
    src: string,
    isServer: boolean,
    index: number,
    isMain: boolean,
  ) => (
    <div
      key={`${isServer ? "server" : "local"}-${index}`}
      className="relative group"
    >
      <Image
        src={src}
        className="w-24 h-24 object-cover rounded-lg border border-gray-100"
        alt=""
        fallbackSrc="/no-image.png"
      />
      <button
        type="button"
        onClick={(ev) => {
          ev.stopPropagation();
          if (!multiple) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl("");
            onFileChange?.(null);
          } else if (isServer) {
            onRemoveServer?.(index);
          } else {
            removeLocalPreview(index);
            onRemoveLocal?.(index);
          }
        }}
        className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 rounded-full p-1 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={12} />
      </button>
      {isMain && !hideBadge && (
        <span className="absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#5850eb] text-white">
          MAIN PHOTO
        </span>
      )}
    </div>
  );

  return (
    <div>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
      />

      <div className="flex flex-wrap gap-3">
        {!multiple && singleSrc && renderImageItem(singleSrc, true, 0, true)}

        {multiple &&
          serverList.map((src, idx) =>
            renderImageItem(src, true, idx, idx === 0),
          )}
        {multiple &&
          previewUrls.map((src, idx) => {
            const isMain = idx === 0 && serverList.length === 0;
            return renderImageItem(src, false, idx, isMain);
          })}

        {(multiple || (!multiple && !singleSrc)) && (
          <div
            onClick={openPicker}
            className={[
              "w-24 h-24 border-2 border-dashed border-gray-200 rounded-xl",
              "flex flex-col items-center justify-center text-center",
              disabled
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50",
            ].join(" ")}
          >
            <Plus size={20} className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-400 font-medium">
              Add Image
            </span>
          </div>
        )}
      </div>

      {error ? (
        <div className="text-xs text-red-500 ml-1 mt-2">{error}</div>
      ) : null}
    </div>
  );
}
