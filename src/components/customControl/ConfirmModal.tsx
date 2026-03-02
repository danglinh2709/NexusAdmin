import { X, AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface IConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
}: IConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-[440px] rounded-[32px] p-8 relative shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute top-6 right-6"
        >
          <X size={20} />
        </Button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{title}</h2>
          <p className="text-[#8A92A6] text-sm leading-relaxed mb-8 flex flex-col gap-0.5">
            {message.split("\n").map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Deleting..." : confirmLabel}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
