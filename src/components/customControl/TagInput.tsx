import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { X } from "lucide-react";

type TTagInput = {
  label: string;
  values: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  error?: string;
  maxTags: number;
};
export function TagInput({
  label,
  values,
  addTag,
  removeTag,
  error,
  maxTags,
}: TTagInput) {
  const [userInput, setUserInput] = useState<string>(" ");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim() !== "" && values.length < maxTags) {
        addTag(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col w-[300px] md:w-full">
      <div className="text-[12px] font-semibold tracking-widest text-slate-400 mb-2">
        {label}
      </div>
      <Input
        name="keyword_tags"
        type="text"
        onKeyDown={handleKeyPress}
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {values.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start rounded-[32px] text-sm  font-medium  mr-2"
          >
            {tag}
            <Button variant="none" onClick={() => removeTag(tag)}>
              <X size={10} />
            </Button>
          </span>
        ))}
      </div>

      {error ? (
        <div className="text-xs text-red-500 ml-1 mt-0.5">{error}</div>
      ) : null}
    </div>
  );
}
