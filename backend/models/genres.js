import mongoose from "mongoose"

const genreSchema = new mongoose.Schema({
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
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre