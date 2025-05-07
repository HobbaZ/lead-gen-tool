import useLogout from "../api/useLogout";
import { useEffect } from "react";

const Logout = () => {
  const { logout, message } = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    message && <p className="text-center text-sm text-gray-700">{message}</p>
  );
};

export default Logout;
