import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = "text-blue-600",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className} ${color}`}>
      <span className="font-medium text-sm">Loading...</span>
    </div>
  );
};
