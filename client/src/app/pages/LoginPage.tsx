import  { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string>("");
  const [loading , setLoading] = useState(false);
  const {currentUser, fetchCurrentUser, login} = useUser();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const name = username.trim();
      login(name);
    } catch (error) {
      const message = (error as Error).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser, navigate]);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-2xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
      <p className="text-lg text-center text-gray-600 mb-8">Login to continue</p>

      <Input disabled={loading} placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

      {error && <p className="text-red-500 text-md mt-3 text-center">{error}</p>}

      <Button text="Login" onClick={handleLogin} disabled={!username} loading={loading} />
    </div>
  </div>
  );
}

export default Login;
