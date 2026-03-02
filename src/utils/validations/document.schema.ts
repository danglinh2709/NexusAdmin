import { z } from "zod";
import { uploadConfig } from "../../configs/upload.config";

const maxBytes = uploadConfig.maxSizeMB * 1024 * 1024;

function getExtension(file: File) {
  return file.name.split(".").pop()?.toLocaleLowerCase() ?? " ";
}

export const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z
    .instanceof(File)
    .refine(
      (file) => uploadConfig.allowedExtensions.includes(getExtension(file)),
      {
        message: `only accept: ${uploadConfig.allowedExtensions.join(", ")}`,
      },
    )
    .refine((file) => file.size <= maxBytes, {
      message: `Maximum file size ${uploadConfig.maxSizeMB} MB.`,
    })
    .optional(),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;
