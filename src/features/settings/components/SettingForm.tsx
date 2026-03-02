import { X, Info } from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import { FORM_MODE, type FormMode } from "../../../configs/common.config";
import type { ISetting, ISettingPayload } from "../../../types/setting.type";
import { Input } from "../../../components/customControl/Input";
import { useEffect, useState } from "react";
import {
  systemConfigSchema,
  type SystemConfigFormValues,
} from "../../../utils/validations/setting.schema";
import { ZodError } from "zod";
import { ApiError } from "../../../utils/api-error";
import { ERROR_CODE } from "../../../configs/error.config";
import { Database } from "lucide-react";
interface ISettingForm {
  mode: FormMode;
  initialData?: ISetting | null;
  onCancel: () => void;
  onSubmit: (data: ISettingPayload) => Promise<void>;
}
export const SettingForm = ({
  mode,
  initialData,
  onCancel,
  onSubmit,
}: ISettingForm) => {
  const isCreate = mode === FORM_MODE.CREATE;

  const [form, setForm] = useState<SystemConfigFormValues>({
    configKey: "",
    description: "",
    configData: "{\n\n}",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        configKey: initialData.configKey,
        description: initialData.description,
        configData: JSON.stringify(initialData.configData, null, 2),
      });
    } else {
      setForm({
        configKey: "",
        description: "",
        configData: "{\n\n}",
      });
    }
  }, [initialData]);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SystemConfigFormValues, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    setForm((prev) => ({ ...prev, configData: value }));

    try {
      JSON.parse(value);
      setJsonError(null);
    } catch {
      setJsonError("Invalid JSON format");
    }
  };

  const handleSubmit = async () => {
    if (jsonError) return;
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      const validated = systemConfigSchema.parse(form);

      const payload: ISettingPayload = validated;
      await onSubmit(payload);
      onCancel();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.issues);
        const errors: typeof fieldErrors = {};
        err.issues.forEach((e) => {
          const key = e.path[0] as keyof SystemConfigFormValues;
          errors[key] = e.message;
        });

        setFieldErrors(errors);
        return;
      }

      if (err instanceof ApiError) {
        if (err.code === ERROR_CODE.CONFLICT) {
          setFieldErrors({ configKey: err.message });
          return;
        }

        setError(err.message);
        return;
      }

      setError(isCreate ? "Create setting failed" : "Update setting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#5850eb] flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
            <Database />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1E293B] leading-tight mb-1">
              {isCreate ? "Create New Setting" : "Edit Setting"}
            </h2>
            <p className="text-sm text-[#64748B]">
              Configure system-wide variables and objects.
            </p>
          </div>
        </div>

        <Button onClick={onCancel}>
          <X size={20} />
        </Button>
      </div>

      {/* Form Fields */}
      <div className="flex gap-6 mb-8">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-bold text-[#475569] block">
            Configuration Key
          </label>
          <Input
            type="text"
            placeholder="e.g. system_maintenance_mode"
            value={form.configKey}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, configKey: e.target.value }))
            }
            error={fieldErrors.configKey}
          />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-bold text-[#475569] block">
            Short Description
          </label>
          <Input
            type="text"
            placeholder="What does this config do?"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            error={fieldErrors.description}
          />
        </div>
      </div>

      {/* JSON Editor Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#5850eb] font-mono text-lg font-bold">
              {"<>"}
            </span>
            <label className="text-sm font-bold text-[#475569]">
              Configuration Data (JSON)
            </label>
          </div>
          <div>
            {jsonError ? (
              <div className="text-red-500 text-xs font-bold">Invalid JSON</div>
            ) : (
              <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
                Valid Format
              </div>
            )}
          </div>
        </div>

        <div className="relative group rounded-xl overflow-hidden shadow-inner ring-1 ring-black/5">
          <div
            className={`
    relative rounded-2xl
    border
    ${jsonError ? "border-red-500 ring-1 ring-red-500" : "border-[#1E293B]"}
    bg-[#020817]
    transition-all duration-200
    focus-within:ring-2
    ${jsonError ? "focus-within:ring-red-500 focus-within:border-red-500" : "focus-within:ring-violet-500 focus-within:border-violet-500"}
  `}
          >
            <textarea
              className="
            w-full h-[280px]
            bg-transparent
            text-gray-300 font-mono text-sm
            p-6 pl-16 leading-relaxed
            focus:outline-none
            resize-none block
            "
              spellCheck={false}
              value={form.configData}
              onChange={(e) => handleJsonChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 flex gap-4 mb-8">
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <Info className="text-[#5850eb]" size={16} />
        </div>
        <div className="space-y-2 pt-1">
          <p className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
            JSON Formatting Rules:
          </p>
          <ul className="text-[13px] text-[#64748B] space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>Use double quotes for all keys and string values.</li>
            <li>Trailing commas are not permitted.</li>
            <li>Ensure all brackets and braces are correctly closed.</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
        <Button variant="secondary" onClick={onCancel || !!jsonError}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? isCreate
              ? "Saving ..."
              : "Updating ..."
            : isCreate
              ? "Save Setting"
              : "Update Setting"}
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
    </div>
  );
};
