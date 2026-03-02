import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import { LoadingOverlay } from "../customControl/LoadingOverlay";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
          <LoadingOverlay />
        </main>
      </div>
    </div>
  );
};
