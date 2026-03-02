import { useEffect, useState } from "react";
import { FORM_MODE, type FormMode } from "../../../configs/common.config";
import type { ICategory, ICategoryPayload } from "../../../types/category.type";
import { Input } from "../../../components/customControl/Input";
import { Button } from "../../../components/customControl/Button";
import { ZodError } from "zod";
import { ApiError } from "../../../utils/api-error";
import { ERROR_CODE } from "../../../configs/error.config";
import { X } from "lucide-react";
import { baseCategorySchema } from "../../../utils/validations/category.schema";

interface ICategoryFormProps {
  mode: FormMode;
  initialData: ICategory | null;
  onSubmit: (data: ICategoryPayload) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: ICategoryFormProps) {
  const isCreate = mode === FORM_MODE.CREATE;

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      const payload: ICategoryPayload = {
        name,
        description,
      };

      const validated = baseCategorySchema.parse(payload);
      await onSubmit(validated);

      onCancel();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: typeof fieldErrors = {};
        err.issues.forEach((e) => {
          const key = e.path[0] as keyof typeof errors;
          errors[key] = e.message;
        });
        setFieldErrors(errors);
        return;
      }

      if (err instanceof ApiError) {
        if (err.code === ERROR_CODE.CONFLICT) {
          setFieldErrors({ name: err.message });
          return;
        }

        setError(err.message);
        return;
      }

      setError(isCreate ? "Create category failed" : "Update category failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 pb-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1E293B]">
            {isCreate ? "Add New Category" : "Edit Category"}
          </h2>
          <Button onClick={onCancel} variant="ghost">
            <X size={20} />
          </Button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1E293B]">
              Category Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart Home"
              error={fieldErrors.name}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1E293B]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the category..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
            />
            {fieldErrors.description && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.description}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <div className="px-8 pb-8 flex items-center justify-end gap-3">
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? isCreate
                ? "Saving..."
                : "Updating..."
              : isCreate
                ? "Save Category"
                : "Update Category"}
          </Button>
        </div>
      </div>
    </div>
  );
}
