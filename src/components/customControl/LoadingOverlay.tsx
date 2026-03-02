import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useLoadingStore } from "../../stores/loadingStore";

export const LoadingOverlay: React.FC = () => {
  const { isLoading, message } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-[2px] transition-all duration-300">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <LoadingSpinner size="lg" color="text-blue-600" />
          <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-ping -z-10" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-gray-900 tracking-tight">
            {message || "Đang tải dữ liệu..."}
          </p>
          <p className="text-sm text-gray-500 font-medium animate-pulse">
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    </div>
  );
};
