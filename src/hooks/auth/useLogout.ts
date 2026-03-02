import { useAuth } from "../../stores/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../configs/route.config";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return async () => {
    await logout();
    navigate(ROUTES.AUTH.LOGIN);
  };
};
