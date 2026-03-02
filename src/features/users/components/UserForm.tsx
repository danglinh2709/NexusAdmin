import { Key, Mail, RefreshCw, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../../components/customControl/Input";
import { Button } from "../../../components/customControl/Button";
import type { IUser, IUserPayload } from "../../../types/user.type";
import {
  createUserSchema,
  updateUserSchema,
} from "../../../utils/validations/user.schema";
import { ZodError } from "zod";
import { ApiError } from "../../../utils/api-error";
import { FORM_MODE, type FormMode } from "../../../configs/common.config";
import { ERROR_CODE } from "../../../configs/error.config";

interface IUserFormProps {
  mode: FormMode;
  onSubmit: (data: IUserPayload) => Promise<void>;
  initialData: IUser | null;
  onCancel: () => void;
}
export function UserForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: IUserFormProps) {
  const isCreate = mode === FORM_MODE.CREATE;

  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setEmail(initialData.email);
    } else {
      setFullName("");
      setEmail("");
    }
  }, [initialData]);

  const handleAutoGenPassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      const payload: IUserPayload = {
        fullName,
        email,
        ...(password ? { password } : {}),
      };

      const schema = isCreate ? createUserSchema : updateUserSchema;
      const validated = schema.parse(payload);
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
          setFieldErrors({ email: err.message });
          return;
        }

        setError(err.message);
        return;
      }

      setError(isCreate ? "Create user failed" : "Update user failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="p-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Key size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">
            {isCreate ? "Create New User" : "Edit User"}
          </h2>
        </div>
        <Button onClick={onCancel} variant="none">
          <X size={20} />
        </Button>
      </div>

      <div className="px-8 py-4 space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 ml-1">
            <User size={14} className="text-[#8A92A6]" />
            <label className="text-[11px] font-bold text-[#8A92A6] uppercase tracking-wider">
              Full Name
            </label>
          </div>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
            error={fieldErrors.fullName}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 ml-1">
            <Mail size={14} className="text-[#8A92A6]" />
            <label className="text-[11px] font-bold text-[#8A92A6] uppercase tracking-wider">
              Email Address
            </label>
          </div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@nexus.com"
            error={fieldErrors.email}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 ml-1">
            <Key size={14} className="text-[#8A92A6]" />
            <label className="text-[11px] font-bold text-[#8A92A6] uppercase tracking-wider">
              Password
            </label>
          </div>
          <Input
            error={fieldErrors.password}
            type="password"
            placeholder={
              isCreate ? "Enter password" : "Leave blank to keep current"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <Button variant="secondary" onClick={handleAutoGenPassword}>
                <RefreshCw size={18} />
                Auto-Gen
              </Button>
            }
          />

          <p className="text-[11px] text-[#8A92A6] ml-1">
            Generate a secure password or type your own.
          </p>
        </div>
      </div>

      <div className="p-8 pt-4 flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          Discard
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? isCreate
              ? "Registering..."
              : "Updating..."
            : isCreate
              ? "Register User"
              : "Update User"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
