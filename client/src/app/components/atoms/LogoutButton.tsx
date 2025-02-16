import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <button className="p-2 bg-red-500 text-white rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
