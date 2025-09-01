import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const NotificationCard = ({ notification }) => {
  let { to, fromModel, type, favourite, read, description, createdAt, _id, from } = notification;

  const [favourites, setFavourite] = useState(favourite);
  const [viewNotification, setViewNotification] = useState(false);
  const [isRead, setRead] = useState(read);

  const favBtnHandler = async () => {
    setFavourite(!favourites);
    const response = await axios.put(`/api/notification/${_id}`, { withCredentials: true });
    if (response.status == 200) {
      console.log("fav the notification", response.data);
    }
  };

  const viewNotificationhandler = async () => {
    setViewNotification((prev) => !prev);
    {
      !isRead && setRead(true);
    }
    const response = await axios.get(`/api/notification/${_id}`, { withCredentials: true });
    if (response.status == 200) {
      console.log("read the notification", response.data);
    }
  };

  const deleteNotificationHandler = async () => {
    console.log("ask to delete");
    //auto remove part is need to impliment
    const response = await axios.delete(`/api/notification/${_id}`, { withCredentials: true });
    if (response.status == 200) {
      console.log("deleted", response.data);
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div
        className={`flex shadow-2xl border-b-0 pb-3 justify-between sm:w-4xl w-screen m-1 px-5 cursor-pointer ${
          !isRead ? "border-l-6  border-l-lime-200" : "border-l-0"
        }`}
        key={_id}>
        <div className="flex flex-col" onClick={viewNotificationhandler}>
          <span className="text-2xl font-bold">{fromModel}</span>
          <span>{type}</span>
        </div>
        <div className="flex md:gap-10 items-center flex-row gap-3">
          {favourites ? (
            <FaStar className=" m-1.5 text-2xl" onClick={favBtnHandler} />
          ) : (
            <FaRegStar className=" m-1.5 text-2xl" onClick={favBtnHandler} />
          )}
          <div className="flex md:flex-row flex-col gap-2 ">
            <button
              onClick={viewNotificationhandler}
              className="bg-green-500 rounded-2xl px-4 py-2 text-white cursor-pointer">
              Read
            </button>
            <button
              onClick={deleteNotificationHandler}
              className="bg-red-500 rounded-2xl px-4 py-2 text-white cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          viewNotification ? "box" : "hidden"
        } absolute inset-0 backdrop-blur-sm p-10 z-100 `}>
        <div>
          <div className=" flex absolute md:inset-20 sm:inset-y-50 inset-y-20 inset-x-10 inset bg-red-400 ml-15 sm:mx-50">
            <div className="flex justify-end z-999 relative bottom-5 left-full ">
              <IoCloseSharp
                className=" text-white text-2xl bg-gray-800 rounded-full flex cursor-pointer  hover:bg-red-400"
                onClick={viewNotificationhandler}
              />
            </div>
            {/*data on notification */}
            <div>
              <div className="flex flex-col justify-center m-5 w-md relative">
                <span className="text-2xl font-bold">From :{from?.name}</span>
                <span className="text-sm ">NIC :{from?.NIC}</span>

                <span className="text-gray-900 text-sm">
                  Created At : {createdAt?.split("T")[0]}
                </span>

                <div className="pb-7">
                  <span>Message : {description}</span>
                </div>

                <div className="flex md:flex-row flex-col gap-2 ">
                  {favourites ? (
                    <FaStar className="cursor-pointer m-1.5 text-2xl" onClick={favBtnHandler} />
                  ) : (
                    <FaRegStar className=" m-1.5 text-2xl cursor-pointer" onClick={favBtnHandler} />
                  )}

                  <button
                    onClick={deleteNotificationHandler}
                    className="bg-red-500 rounded-2xl px-4 py-2 text-white cursor-pointer">
                    Delete
                  </button>
                </div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string,
    NIC: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      NIC: PropTypes.string,
    }),
    fromModel: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    read: PropTypes.bool,
    favourite: PropTypes.bool,
    createdAt: PropTypes.string,
  }),
};

export default NotificationCard;
