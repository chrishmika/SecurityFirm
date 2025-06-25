import { PuffLoader } from "react-spinners";
import axios from "axios";
import { useEffect, useState } from "react";

const MiniNotificationWindow = () => {
  const [notifications, setNotifications] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const response = await axios.get("/api/notification", { withCredentials: true });
        setNotifications(response.data);
        setFetching(false);
        console.log(response.data);
      } catch (error) {
        setFetching(false);
        console.error("Failed to fetch notifications:", error);
      }
    };
    getAllNotifications();
  }, []);

  const notificationsset = notifications.slice(0, 7);

  return (
    <div className=" h-full rounded-2xl pl-2 pr-2 overflow-y-scroll overflow-x-hidden flex-wrap scroll-m-0">
      <div className="">
        <div className="py-2">
          <span className="font-bold text-2xl px-2 flex justify-center">Notifications</span>
        </div>

        {fetching ? <div className="flex justify-center items-center  ">{<PuffLoader />}</div> : ""}

        <div className="">
          {notificationsset.map((notification, key) => (
            <div key={key} className={`flex justify-between mb-0.75 px-5 py-2 shadow-2xs rounded-2xl  hover:cursor-pointer ${notification.read ? "bg-white" : "bg-green-200"}`}>
              <div>
                <strong>From: </strong>
                {notification.from?.name || "No name"}
                <br />

                <strong>About: </strong>
                {notification.description || "undefined"}
                <br />
              </div>
              <div className="flex flex-col gap-1 items-center justify-center h-full border-l-1 pl-2">
                <span key={key}>Read</span>
                <span key={key}>Delete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniNotificationWindow;
