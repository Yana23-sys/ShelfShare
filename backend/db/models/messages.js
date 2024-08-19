import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message_id: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  username: { type: String, required: true, ref: "User" }, // Reference to Users collection
  name: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
