import mongoose from "mongoose";

const SwapSchema = new mongoose.Schema({
  swap_id: { type: String, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now },
  book_id: { type: String, required: true, ref: "Book" }, // Reference to Books collection
  book_title: { type: String, required: true },
  book_author: { type: String, required: true },
  swapped_with_username: { type: String, required: true, ref: "User" }, // Reference to Users collection
  swapped_with_name: { type: String, required: true },
  book_image: { type: String }, // Assume URLs for images
});

export default mongoose.models.Swap || mongoose.model("Swap", SwapSchema);
