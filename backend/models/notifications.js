const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  date_created: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);


const createNotification = async ({ user_id, message }) => {
    const notification = new Notification({ user_id, message });
    return await notification.save();
};

const updateNotification = async (notificationId, seen) => {
    return await Notification.findByIdAndUpdate(notificationId, { seen }, { new: true });
};

const getNotificationByUserId = async (userId, seen = false) => {
    return await Notification.find({ user_id: ObjectId.createFromHexString(userId), seen: seen }).sort({ date_created: -1 });
};

module.exports = { createNotification, updateNotification, getNotificationByUserId };