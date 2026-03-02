import React from "react";

interface Column {
  title: string;
  className?: string;
}

interface BaseTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

export function BaseTable<T>({ columns, data, renderRow }: BaseTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#FBFCFE]">
          <tr className="text-left text-[11px] font-bold text-[#8A92A6] tracking-wider border-b border-gray-100">
            {columns.map((col, i) => (
              <th key={i} className={`py-4 uppercase ${col.className || ""}`}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <React.Fragment key={i}>{renderRow(item)}</React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
