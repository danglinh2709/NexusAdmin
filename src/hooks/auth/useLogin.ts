import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { loginSchema } from "../../utils/validations/auth.schema";
import { ROUTES } from "../../configs/route.config";
import { useAuth } from "../../stores/AuthContext";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

      loginSchema.parse({ email, password });

      await login(email, password);
      navigate(ROUTES.APP.DASHBOARD);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errors: typeof fieldErrors = {};
        err.issues.forEach((e) => {
          const field = e.path[0] as "email" | "password";
          errors[field] = e.message;
        });
        setFieldErrors(errors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    fieldErrors,
    setEmail,
    setPassword,
    submit,
  };
};
