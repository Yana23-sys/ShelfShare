const { createNotification, updateNotification, getNotificationByUserId } = require('../models/notifications');
const mongoose = require("mongoose");

exports.getNotifications = async (req, res, next) => {
    const { userId } = req.query;
    const seen = req.query.seen === 'true'; // convert 'true'/'false' to boolean

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user ID format" });
    }

    try {
        const notifications = await getNotificationByUserId(userId, seen);
        res.status(200).send(notifications);
    } catch (error) {
        console.error("Error getting notifications:", error);
        next(error);
    }
};

exports.markNotificationAsSeen = async (req, res, next) => {
    const { id } = req.params;
    const { seen } = req.body;
    console.log(id, seen, "notif/controller")

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid notification ID format" });
    }


    try {
        const updatedNotification = await updateNotification(id, seen);
        if (!updatedNotification) {
            return res.status(404).send({ message: "Notification not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error updating notification:", error);
        next(error);
    }
};