import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useLoadingStore } from "../../stores/loadingStore";

export const LoadingOverlay: React.FC = () => {
  const { isLoading, message } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-[2px] transition-all duration-300">
      <div className="flex flex-col items-center gap-6">
        <LoadingSpinner size="lg" color="text-blue-600" />
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-gray-900 tracking-tight">
            {message || "Đang tải dữ liệu..."}
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    </div>
  );
};
