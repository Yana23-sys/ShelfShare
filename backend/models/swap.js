import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  date_created: { type: Date, default: Date.now }, // Date swap was created
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to the book being swapped
  book_title: { type: String, required: true }, // Title of the book
  author: { type: String, required: true }, // Author of the book
  swapped_with_username: { type: String, required: true }, // Username of the user who is sending the book
  swapped_with_name: { type: String, required: true }, // Name of the user who is sending the book
  book_image_url: { type: String, required: true }, // Image URL of the book
});

const Swap = mongoose.model("Swap", swapSchema);

module.exports = Swap;