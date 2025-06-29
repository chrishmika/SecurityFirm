import { useEffect, useState } from "react";
import NotificationCard from "./Cards/NotificationCards/NotificationCard";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get("/api/notification/", { withCredentials: true });
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    getNotification();
  }, []);
  return <div className="my-10">{notifications.length > 0 ? notifications.map((notification, key) => <NotificationCard key={key} notification={notification} />) : <div className="flex items-center justify-center w-screen overflow-hidden ">{`No Notifications Found at the moment`}</div>}</div>;
};

export default Notifications;
