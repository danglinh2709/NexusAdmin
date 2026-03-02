import { uploadConfig } from "../../configs/upload.config";

export const buildAcceptString = () =>
  uploadConfig.allowedExtensions.map((ext) => `.${ext}`).join(",");
