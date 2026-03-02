import { forwardRef, type KeyboardEventHandler } from "react";
import { Input } from "../../../components/customControl/Input";

interface IEditableCellProps {
  value?: string;
  editing?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: KeyboardEventHandler;
}

export const EditableCell = forwardRef<HTMLInputElement, IEditableCellProps>(
  ({ value = "", editing, onChange, onKeyDown }, ref) => {
    if (editing) {
      return (
        <Input
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          className="border border-gray-200"
        />
      );
    }

    return <span className={`cursor-pointer transition-colors `}>{value}</span>;
  },
);

EditableCell.displayName = "EditableCell";
