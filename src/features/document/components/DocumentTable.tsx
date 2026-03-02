import { useState } from "react";
import { BaseTable } from "../../../components/layouts/table/BaseTable";
import type { IDocument } from "../../../types/document.type";
import { DocumentRow } from "./DocumentRow";
import { DocumentPreviewModal } from "./DocumentModalPreview";

interface IDocumentTable {
  documents: IDocument[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export const DocumentTable = ({
  documents,
  onDelete,
  onEdit,
}: IDocumentTable) => {
  const [previewDoc, setPreviewDoc] = useState<IDocument | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const handlePreview = (doc: IDocument) => {
    setPreviewDoc(doc);
    setOpenPreview(true);
  };
  return (
    <>
      <DocumentPreviewModal
        open={openPreview}
        document={previewDoc}
        onClose={() => setOpenPreview(false)}
      />
      <BaseTable
        columns={[
          {
            title: "DOCUMENT NAME",
            className: "pl-6",
          },
          {
            title: "SIZE",
          },
          {
            title: "OWNER",
          },
          {
            title: "UPDATED AT",
          },
          {
            title: "ACTIONS",
            className: "pr-6 text-right",
          },
        ]}
        data={documents}
        renderRow={(d) => (
          <DocumentRow
            key={d.id}
            document={d}
            onEdit={onEdit}
            onDelete={onDelete}
            onPreview={handlePreview}
          />
        )}
      />
    </>
  );
};
