import { Upload, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { useUpload } from "../../../hooks/common/useUpload";
import { Input } from "../../../components/customControl/Input";
import { Button } from "../../../components/customControl/Button";

type Props = {
  accept?: string;
  onChange?: (file: File | null) => void;
};

export default function FileUploadBox({ accept, onChange }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const { inputRef, openPicker, handleChange } = useUpload({
    accept,
    onFile: (file) => {
      setFile(file);
      onChange?.(file);
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null);
  };

  if (file) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return (
      <div className="border-2 border-dashed border-[#10B981] bg-[#ECFDF5] rounded-2xl p-6 flex items-center justify-between group relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
            <Check size={20} strokeWidth={3} />
          </div>
          <div className="text-left">
            <p className="font-bold text-[#064E3B] text-base truncate max-w-[250px]">
              {file.name}
            </p>
            <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider flex gap-2">
              <span>{fileSizeMB} MB</span>
              <span>• READY TO UPLOAD</span>
            </p>
          </div>
        </div>
        <Button onClick={handleRemove}>
          <Trash2 size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={openPicker}
      className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F8FAFC] transition-colors bg-white hover:border-[#CBD5E1] group"
    >
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      <div className="mb-4 w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#6366F1] group-hover:bg-[#E2E8F0] transition-colors">
        <Upload size={24} />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-bold text-[#1E293B]">Click to select file</p>
        <p className="text-xs text-[#94A3B8]">or drag and drop here</p>
      </div>
    </div>
  );
}
