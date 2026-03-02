import { UserMenuFunction } from "./UserMenuFunction";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 flex items-center justify-end px-8 h-16 sticky top-0 z-10 transition-all duration-200">
      <UserMenuFunction />
    </header>
  );
};
