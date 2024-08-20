import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now }, // Date swap was created
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to the book being swapped
  bookTitle: { type: String, required: true }, // Title of the book
  author: { type: String, required: true }, // Author of the book
  swappedWithUsername: { type: String, required: true }, // Username of the user who is sending the book
  swappedWithName: { type: String, required: true }, // Name of the user who is sending the book
  bookImageUrl: { type: String, required: true }, // Image URL of the book
});

export default mongoose.models.Swap || mongoose.model("Swap", swapSchema);
