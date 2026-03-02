import { BaseTable } from "../../../components/layouts/table/BaseTable";
import type { IContentPages } from "../../../types/contentPages.type";
import { ContentRow } from "./ContentRow";

interface IContentTableProps {
  contentPages: IContentPages[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export const ContentTable = ({
  contentPages,
  onEdit,
  onDelete,
}: IContentTableProps) => {
  return (
    <BaseTable
      columns={[
        { title: "PAGE CONTENT", className: "pl-6 w-[40%]" },
        { title: "STATUS", className: "text-center w-[15%]" },
        { title: "HISTORY", className: "w-[25%]" },
        { title: "ACTIONS", className: "pr-6 text-right w-[20%]" },
      ]}
      data={contentPages}
      renderRow={(c) => (
        <ContentRow
          key={c.id}
          content={c}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};
