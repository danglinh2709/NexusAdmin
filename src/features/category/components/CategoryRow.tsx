import { Layers, Check, X, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../../components/customControl/Button";
import { EditableCell } from "./EditableCell";
import { categoryService } from "../../../services/category.service";
import type { ICategory } from "../../../types/category.type";
import { useClickOutside } from "../../../hooks/common/useClickOutside";

interface ICategoryRowProps {
  category: ICategory;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CategoryRow = ({
  category,
  onEdit,
  onDelete,
}: ICategoryRowProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState({
    name: category.name,
    description: category.description,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (editing) {
      nameInputRef.current?.focus();
    }
  }, [editing]);

  // Click outside to cancel
  useClickOutside(rowRef, () => {
    if (editing) handleCancel();
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    },
    [draft],
  );
  const handleSave = async () => {
    try {
      setLoading(true);
      await categoryService.updateCategory(category.id, draft);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDraft({ name: category.name, description: category.description });
    setEditing(false);
  };

  return (
    <tr ref={rowRef} className="border-b border-gray-100 hover:bg-gray-50/50">
      <td
        className="py-4 pl-6 pr-4"
        onClick={() => !editing && setEditing(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
            <Layers size={18} />
          </div>

          <EditableCell
            ref={nameInputRef}
            value={draft.name}
            editing={editing}
            onChange={(v) => setDraft((s) => ({ ...s, name: v }))}
            onKeyDown={handleKeyDown}
          />
        </div>
      </td>

      <td className="py-4 pr-6" onClick={() => !editing && setEditing(true)}>
        <EditableCell
          ref={descInputRef}
          value={draft.description}
          editing={editing}
          onChange={(v) => setDraft((s) => ({ ...s, description: v }))}
          onKeyDown={handleKeyDown}
        />
      </td>

      <td className="py-4 text-center">
        <span className="text-sm font-medium text-[#64748B] bg-[#F3F4F6] px-2 py-1 rounded-full">
          {category.productCount} Items
        </span>
      </td>

      <td className="py-4 pr-6">
        <div className="flex justify-end gap-2">
          {editing ? (
            <>
              <Button
                variant="secondary"
                onClick={handleSave}
                disabled={loading}
              >
                <Check size={18} />
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                <X size={18} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => onEdit?.(category.id)}>
                <Pencil size={18} />
              </Button>
              <Button variant="ghost" onClick={() => onDelete?.(category.id)}>
                <Trash2 size={18} />
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
