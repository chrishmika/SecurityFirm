import Notification from "../../models/notification.model.mjs";

const createNotification = async (to, from, fromModel = "User", type, description) => {
  const newNotification = new Notification({ to, from, fromModel, type, description });
  await newNotification.save();
  console.log(newNotification);
};

export default createNotification;
