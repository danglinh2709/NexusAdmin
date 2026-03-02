import { X, AlertCircle } from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import { FORM_MODE, type FormMode } from "../../../configs/common.config";
import type { IDocument } from "../../../types/document.type";
import { Input } from "../../../components/customControl/Input";
import { useEffect, useState } from "react";
import {
  documentSchema,
  type DocumentFormValues,
} from "../../../utils/validations/document.schema";
import { ZodError } from "zod";
import { ApiError } from "../../../utils/api-error";
import { ERROR_CODE } from "../../../configs/error.config";
import FileUploadBox from "./FileUploadBox";
import { buildAcceptString } from "../../../utils/helper/upload.helper";

interface IDocumentForm {
  mode: FormMode;
  initialData?: IDocument | null;
  onCancel: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

export const DocumentForm = ({
  mode,
  initialData,
  onCancel,
  onSubmit,
}: IDocumentForm) => {
  const isCreate = mode === FORM_MODE.CREATE;
  const [showUpload, setShowUpload] = useState<boolean>(isCreate);

  const [form, setForm] = useState<DocumentFormValues>({
    title: "",
    file: undefined,
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof DocumentFormValues, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || initialData.fileName,
        file: undefined,
      });
      setShowUpload(false);
    } else {
      setForm({
        title: "",
        file: undefined,
      });
      setShowUpload(true);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      const validated = documentSchema.parse(form);

      const formData = new FormData();

      formData.append("title", validated.title);
      if (validated.file) {
        formData.append("file", validated.file);
      }
      await onSubmit(formData);
      onCancel();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: typeof fieldErrors = {};
        err.issues.forEach((e) => {
          const key = e.path[0] as keyof DocumentFormValues;
          errors[key] = e.message;
        });
        setFieldErrors(errors);
        return;
      }

      if (err instanceof ApiError) {
        if (err.code === ERROR_CODE.CONFLICT) {
          setFieldErrors({ title: err.message });
          return;
        }

        setError(err.message);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#1E293B]">
          {isCreate ? "Upload New Document" : "Update Document"}
        </h2>
        <Button onClick={onCancel}>
          <X size={20} />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-2xl p-5 flex items-start gap-4">
          <div className="mt-0.5 text-[#6366F1]">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[#6366F1] font-bold text-sm leading-[1.6]">
              Supported formats: PDF, DOCX, XLSX, JPG.
              <br />
              Maximum file size: 5MB.
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {(isCreate || showUpload) && (
            <>
              <FileUploadBox
                accept={buildAcceptString()}
                onChange={(file) =>
                  setForm((prev) => ({
                    ...prev,
                    file: file ?? undefined,
                    title: file
                      ? prev.title.trim()
                        ? prev.title
                        : file.name
                      : prev.title,
                  }))
                }
              />

              {fieldErrors.file && (
                <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.file}
                </p>
              )}
            </>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#8A92A6] uppercase tracking-wider ml-1">
              Document Title *
            </label>
            <Input
              type="text"
              placeholder="e.g. Q4 Financial Report"
              uiSize="md"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              error={fieldErrors.title}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Button variant="none" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Processing..."
              : isCreate
                ? "Upload Document"
                : "Update Document"}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
