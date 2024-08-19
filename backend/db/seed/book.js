import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  publication_year: { type: String },
  posted_date: { type: String },
  username: { type: String, required: true }, // Assuming this links to a user who posted the book
  cover_image_url: { type: String },
});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
