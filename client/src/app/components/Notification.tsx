import React, {  useEffect } from "react";
import useNotification from "../hooks/useNotification";

const Notification: React.FC = () => {
  const { notifications, clearNotification } = useNotification();

  useEffect(() => {
    if (notifications.length > 0) {
      setTimeout(() => clearNotification(), 5000);
    }
  }, [notifications, clearNotification]);

  return (
    <div className="relative">
      {notifications.map((notif, index) => (
         <div className="fixed top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
         {notif}
         <button className="ml-3 text-white font-bold" onClick={clearNotification}>×</button>
       </div>
      ))}
    </div>
  );
};

export default Notification;
