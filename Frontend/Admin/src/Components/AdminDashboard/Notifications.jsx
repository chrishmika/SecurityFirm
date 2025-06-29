import { useEffect, useState } from "react";
import NotificationCard from "./Cards/NotificationCards/NotificationCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      {
        id: "1",
        to: "shehan",
        from: "sahan",
        fromModel: "application",
        type: "employee",
        message: "Hello, how are you?",
        read: false,
        favourite: false,
      },
      {
        id: "2",
        to: "sahan",
        from: "shehan",
        fromModel: "application",
        type: "admin",
        message: "This is another notification.",
        read: true,
        favourite: false,
      },
      {
        id: "3",
        to: "john",
        from: "doe",
        fromModel: "System",
        type: "user",
        message: "Welcome aboard!",
        read: false,
        favourite: true,
      },
    ]);
  }, []);
  return <div>{notifications.length > 0 ? notifications.map((notification, key) => <NotificationCard key={key} notification={notification} />) : <div className="flex items-center justify-center w-screen overflow-hidden ">{`No Notifications Found at the moment`}</div>}</div>;
};

export default Notifications;
