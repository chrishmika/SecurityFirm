import Notification from "../models/notification.model.mjs";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId })
      .sort({ favourite: -1, createdAt: -1 })
      .populate({
        path: "from",
        select: "name NIC",
      });

    if (notifications.length === 0) {
      return res.status(404).json({ message: `No notifications available` });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.log(`error on notification controller ${error.message}`);
    res.status(500).json({ error: `internal server error on getNotification` });
  }
};

export const viewNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId).populate({
      path: "from",
      select: "-password",
    });

    if (!notification) return res.status(404).json({ error: `notification not found` });

    await Notification.findByIdAndUpdate(notificationId, { read: true });

    res.status(200).json(notification);
  } catch (error) {
    console.log(`error on notification controller ${error.message}`);
    res.status(500).json({ error: `internal server error on getNotification` });
  }
};

export const markFavourite = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: `notification not found` });

    notification.favourite = !notification.favourite;
    await notification.save();
    console.log(notification);

    if (notification.favourite) {
      res.status(200).json({ notification, message: "Added to Favourite" });
    } else {
      res.status(200).json({ notification, message: "Removed from Favourite" });
    }
  } catch (error) {
    console.log(`error on notification controller ${error.message}`);
    res.status(500).json({ error: `internal server error on markFavourite` });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: `notification not found` });

    await Notification.findByIdAndDelete(notificationId);

    res.status(200).json({ message: `notification delete sucessfull` });
  } catch (error) {
    console.log(`error on notification controller ${error.message}`);
    res.status(500).json({ error: `internal server error on markFavourite` });
  }
};

export const FavouriteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId, favourite: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "name NIC",
      });

    if (notifications.length === 0) {
      return res.status(404).json({ message: `No notifications available` });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.log(`error on notification controller ${error.message}`);
    res.status(500).json({ error: `internal server error on FavouriteNotifications` });
  }
};
