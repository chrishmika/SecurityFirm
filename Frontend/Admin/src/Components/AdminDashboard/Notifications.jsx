import { useEffect, useState } from "react";
import NotificationCard from "./Cards/NotificationCards/NotificationCard";
import axios from "axios";
import { PuffLoader } from "react-spinners";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotification = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/notification/", { withCredentials: true });
        setNotifications(response.data);
        console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    getNotification();
  }, []);

  return (
    <div className="my-10 overflow-hidden">
      {!isLoading ? (
        notifications.length > 0 ? (
          notifications.map((notification, key) => <NotificationCard key={key} notification={notification} />)
        ) : (
          <div className="flex items-center justify-center w-screen">{`No Notifications Found at the moment`}</div>
        )
      ) : (
        <div className="flex justify-center items-center w-screen h-screen ">
          <PuffLoader />
        </div>
      )}
    </div>
  );
};

export default Notifications;
