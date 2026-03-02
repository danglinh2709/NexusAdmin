import ImageUploadBox from "../../../../../components/customControl/ImageUploadBox";
import type { ProductFormValues } from "../../../../../utils/validations/product.schema";

interface IMediaTab {
  fieldErrors: Partial<Record<keyof ProductFormValues, string>>;
  form: ProductFormValues;
  setField: <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => void;

  onMainImageFileChange: (file: File | null) => void;
  onGalleryFilesChange: (files: File[]) => void;
  onGalleryRemove: (index: number) => void; //
}

export const MediaTab = ({
  fieldErrors,
  form,
  onMainImageFileChange,
  onGalleryFilesChange,
  onGalleryRemove,
  setField,
}: IMediaTab) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-6 items-start">
        <div className="flex-1 min-w-[320px]">
          <ImageUploadBox
            value={form.mainImage}
            onFileChange={(file) => {
              setField("mainImage", "");
              onMainImageFileChange(file);
            }}
            multiple
            values={form.images}
            onFilesChange={(files) => onGalleryFilesChange(files)}
            error={fieldErrors.images || fieldErrors.mainImage}
            onRemoveLocal={(index) => onGalleryRemove(index)}
            onRemoveServer={(index) => {
              const newImages = form.images?.filter((_, i) => i !== index);
              setField("images", newImages);
            }}
            variant="gallery"
          />
        </div>
      </div>
    </div>
  );
};
