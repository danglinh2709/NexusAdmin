import type { IUser } from "../../../types/user.type";
import { UserRow } from "./UserRow";
import { BaseTable } from "../../../components/layouts/table/BaseTable";

interface IUserTableProps {
  users: IUser[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const UserTable = ({ users, onDelete, onEdit }: IUserTableProps) => {
  return (
    <BaseTable
      columns={[
        { title: "USER", className: "pl-6" },
        { title: "ROLE", className: "text-center" },
        { title: "STATUS", className: "text-center" },
        { title: "ACTIONS", className: "pr-6 text-right" },
      ]}
      data={users}
      renderRow={(u) => (
        <UserRow key={u.id} user={u} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};
