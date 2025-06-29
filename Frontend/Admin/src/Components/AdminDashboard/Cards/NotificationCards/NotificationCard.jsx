import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const NotificationCard = ({ notification }) => {
  let { to, fromModel, type, favourite, read, description, createdAt, _id } = notification;

  const [favourites, setFavourite] = useState(favourite);
  const [viewNotification, setViewNotification] = useState(false);

  const button = () => {
    read = !read;
  };

  const favBtnHandeler = () => {
    setFavourite(!favourites);
  };

  const viewNotificationhandler = () => {
    setViewNotification((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center cursor-pointer ">
      <div className={`flex border-b-2 pb-3 justify-between sm:w-2xl w-screen m-1 px-5 `} key={_id}>
        <div className="flex flex-col" onClick={viewNotificationhandler}>
          <span className="text-2xl font-bold">{fromModel}</span>
          <span>{type}</span>
        </div>
        <div className="flex md:gap-10 items-center flex-row gap-3">
          {favourites ? <FaStar className=" m-1.5 text-2xl" onClick={favBtnHandeler} /> : <FaRegStar className=" m-1.5 text-2xl" onClick={favBtnHandeler} />}
          <div className="flex md:flex-row flex-col gap-2 ">
            <button onClick={button} className="bg-green-500 rounded-2xl px-4 py-2 text-white">
              Read
            </button>
            <button onClick={button} className="bg-red-500 rounded-2xl px-4 py-2 text-white">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className={`${viewNotification ? "box" : "hidden"} absolute inset-0 backdrop-blur-sm p-10 z-100 `}>
        <div>
          <div className=" flex absolute md:inset-20 sm:inset-y-50 inset-y-20 inset-x-10 inset  bg-red-400  ml-15 sm:mx-50">
            <div className="flex justify-end z-999 relative bottom-5 left-full ">
              <IoCloseSharp className=" text-white text-2xl bg-gray-800 rounded-full flex cursor-pointer  hover:bg-red-400" onClick={viewNotificationhandler} />
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
    to: PropTypes.string,
    from: PropTypes.object,
    fromModel: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    read: PropTypes.bool,
    favourite: PropTypes.bool,
  }),
};

export default NotificationCard;
