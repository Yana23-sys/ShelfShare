import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  genre_id: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Drama",
      "Romance",
      "Fantasy/Magic",
      "Horror",
      "Historic",
    ],
  },
});

export default mongoose.models.Genre || mongoose.model("Genre", GenreSchema);
