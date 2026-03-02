import { useState } from "react";
import { ApiError } from "../../utils/api-error";

export const useServiceHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, fallbackMessage: string) => {
    if (err instanceof ApiError) {
      setError(err.message);
      throw err;
    }

    const unknown = new Error(fallbackMessage);
    setError(unknown.message);
    throw unknown;
  };

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => setLoading(false);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    handleError,
  };
};
