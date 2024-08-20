import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  bookTitle: { type: String, required: true },
  author: { type: String, required: true },
  swappedWithUsername: { type: String, required: true },
  swappedWithName: { type: String, required: true },
  bookImageUrl: { type: String, required: true },
});

const swapcollection = mongoose.model("Swap", swapSchema);
module.exports = swapcollection;
