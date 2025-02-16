import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useNotification from "../../hooks/useNotification";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const { addNotification } = useNotification();


  const handleLogout = () => {
    if (!currentUser) {
      addNotification("You are not logged in.");
      return;
    };
    logout()
    navigate('/login');
  };

  return (
    <button className="p-2 bg-red-500 text-white rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
