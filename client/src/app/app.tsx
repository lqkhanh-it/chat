import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NxWelcome from "./nx-welcome";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/welcome" element={<NxWelcome title="@nx-chat-assignment/client" />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
