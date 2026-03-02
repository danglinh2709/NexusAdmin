import { X, LayoutTemplate, Globe, Upload, Undo } from "lucide-react";
import { FORM_MODE, type FormMode } from "../../../configs/common.config";
import { type IContentPages } from "../../../types/contentPages.type";
import { useEffect, useState } from "react";
import { Button } from "../../../components/customControl/Button";
import { Input } from "../../../components/customControl/Input";
import { RichTextEditor } from "./RichTextEditor";
import dayjs from "dayjs";
import { baseContentSchema } from "../../../utils/validations/content.schema";
import { ApiError } from "../../../utils/api-error";
import { ERROR_CODE } from "../../../configs/error.config";
import { ZodError } from "zod";
import { STATUS_TYPE, type STATUS } from "../../../configs/category.config";
import { slugify } from "../../../utils/helper/slugify.helper";
import ImageUploadBox from "../../../components/customControl/ImageUploadBox";

interface IContentForm {
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  mode: FormMode;
  initialData?: IContentPages | null;
}

export const ContentForm = ({
  mode,
  onSubmit,
  onCancel,
  initialData,
}: IContentForm) => {
  const isCreate = mode === FORM_MODE.CREATE;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<STATUS>(STATUS_TYPE.DRAFT);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [isEditingSlug, setIsEditingSlug] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
  }>({});

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditingSlug) setSlug(slugify(value));
  };

  const handleSlugChange = (value: string) => {
    setIsEditingSlug(true);
    setSlug(slugify(value));
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setContent(initialData.content);
      setStatus(initialData.status);

      setIsEditingSlug(true);
    } else {
      setTitle("");
      setSlug("");
      setContent("");
      setStatus(STATUS_TYPE.DRAFT);

      setIsEditingSlug(false);
    }
  }, [initialData]);

  const createdAt = initialData?.createdAt
    ? dayjs(initialData.createdAt).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");

  const updatedAt = initialData?.updatedAt
    ? dayjs(initialData.updatedAt).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const validated = baseContentSchema.parse({
        title,
        slug,
        content,
        status,
      });

      const formData = new FormData();

      formData.append("title", validated.title);
      formData.append("slug", validated.slug);
      formData.append("content", validated.content ?? "");
      formData.append("status", validated.status ?? STATUS_TYPE.DRAFT);

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      await onSubmit(formData);
      onCancel();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: { title?: string } = {};

        err.issues.forEach((issue) => {
          const key = issue.path[0] as keyof typeof errors;
          errors[key] = issue.message;
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

      setError(
        isCreate
          ? "Create content pages failed"
          : "Update content pages failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50/50">
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 text-white">
            <LayoutTemplate size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isCreate ? "Create New Page" : "Edit Page"}
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              Design and publish custom HTML pages for your platform.
            </p>
          </div>
        </div>
        <Button onClick={onCancel}>
          <X size={24} />
        </Button>
      </div>

      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="flex-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Page Title <span className="text-blue-500">*</span>
              </label>
              <Input
                error={fieldErrors.title}
                value={title}
                placeholder="Enter a descriptive title..."
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Content Editor (HTML Supported)
                  <span className="text-blue-500">*</span>
                </label>
              </div>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="w-full lg:w-[360px] space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Globe className="text-blue-600" size={20} />
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                  Publishing Details
                </h3>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Permanent URL Slug
                </label>
                <div className="flex items-center h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 text-sm">
                  <span className="text-gray-400 mr-1">/pages/</span>
                  <Input
                    placeholder="page-url"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Page Status
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 rounded-xl border border-gray-100">
                  <Button onClick={() => setStatus(STATUS_TYPE.PUBLISHED)}>
                    {status === STATUS_TYPE.PUBLISHED && (
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                    Published
                  </Button>
                  <Button onClick={() => setStatus(STATUS_TYPE.DRAFT)}>
                    {status === STATUS_TYPE.DRAFT && <Undo size={14} />}
                    Draft
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    Created At
                  </span>
                  <span className="font-semibold text-gray-600">
                    {createdAt}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    Last Modified
                  </span>
                  <span className="font-semibold text-gray-600">
                    {updatedAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <Upload size={16} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                  Page Image
                </h3>
              </div>
              <ImageUploadBox
                hideBadge={true}
                onFileChange={(file) => {
                  setFeaturedImage(file ?? null);
                }}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
        <Button onClick={onCancel}>Discard Changes</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? isCreate
              ? "Saving..."
              : "Updating..."
            : isCreate
              ? "Save Page"
              : "Update Page"}
        </Button>
      </div>
    </div>
  );
};
