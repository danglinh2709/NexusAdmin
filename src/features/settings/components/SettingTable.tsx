import { BaseTable } from "../../../components/layouts/table/BaseTable";
import type { ISetting } from "../../../types/setting.type";
import { SettingRow } from "./SettingRow";

interface ISettingTable {
  settings: ISetting[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export const SettingTable = ({ settings, onDelete, onEdit }: ISettingTable) => {
  return (
    <BaseTable
      columns={[
        {
          title: "CONFIG KEY",
          className: "pl-6 w-[35%]",
        },
        {
          title: "DESCRIPTION",
          className: "w-[40%] ",
        },
        {
          title: "ACTIONS",
          className: "pr-6 text-right w-[25%] ",
        },
      ]}
      data={settings}
      renderRow={(s) => (
        <SettingRow
          key={s.id}
          setting={s}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};
