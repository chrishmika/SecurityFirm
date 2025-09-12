import { useEffect, useState } from "react";
import NotificationCard from "./Cards/NotificationCards/NotificationCard";
import axios from "axios";
import { PuffLoader } from "react-spinners";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

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
    <div className="my-10 overflow-y-scroll overflow-x-hidden container">
      <div className="border-b-2 border-gray-400 pb-5 flex h-10 justify-center items-center ali font-bold mb-10 gap-3">
        <div
          className="bg-amber-400 w-1/3 cursor-pointer hover:bg-amber-500 flex justify-center"
          onClick={() => {
            setFilter("");
          }}>
          All
        </div>
        <div
          className="bg-green-400 w-1/3 cursor-pointer hover:bg-green-900 flex justify-center"
          onClick={() => {
            setFilter("company");
          }}>
          Company
        </div>
        <div
          className="bg-orange-400 w-1/3 cursor-pointer hover:bg-orange-600 flex justify-center"
          onClick={() => {
            setFilter("employee");
          }}>
          Employee
        </div>
      </div>

      {!isLoading ? (
        notifications.length > 0 ? (
          notifications
            .filter((notification) => (filter == "" ? notification : filter == notification.type))
            .map((notification, key) => <NotificationCard key={key} notification={notification} />)
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
