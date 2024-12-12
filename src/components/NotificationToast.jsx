import React, { useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotificationContext();

  

  return (
    // <div className="fixed top-4 right-4 z-50 space-y-2">
    <div>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;




