import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getting user notifications : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const notification = await Notification.findByIdAndUpdate(
      { _id: notificationId, recipient: req.user._id },
      { read: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in marking user notification as read : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  try {
    await Notification.findByIdAndDelete({
      _id: notificationId,
      recipient: req.user._id,
    });
  } catch (error) {
    console.log("Error in deleting user notification : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
