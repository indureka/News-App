import React, { useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotificationContext();

  

  return (
   
    <div>

   
      {notifications.slice(0).reverse().map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md flex justify-between items-center${
            notification.type === "success"
              ? "bg-neutral-50 text-black"
              : "bg-red-500 text-white"
          }`}
        >
          <p>{notification.message}</p>
          {/* Remove button */}
          <button
              className="bg-white border border-red-600 text-red p-2 hover:bg-red-600 hover:text-white"
              onClick={() => removeNotification(notification.id)}
            >
              X
            </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;




