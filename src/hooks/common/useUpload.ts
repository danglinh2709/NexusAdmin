import { useRef } from "react";

type Options = {
  accept?: string;
  onFile?: (file: File | null) => void;
};

export function useUpload({ accept, onFile }: Options) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onFile?.(null);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    onFile?.(file);
  };

  return {
    inputRef,
    accept,
    openPicker,
    clear,
    handleChange,
  };
}
