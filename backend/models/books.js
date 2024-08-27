const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String },
  publication_year: { type: String },
  posted_date: { type: Date, default: Date.now }, // change type to Date
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming this links to a user who posted the book
  cover_image_url: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

const findAllBooks = async (sortCriteria = {}, filterCriteria = {}) => {
  try {
    const { sortBy } = sortCriteria;

    let sort = {};
    if (sortBy === "genre") {
      sort = { "genre.name": 1 }; // Sort by genre name (ascending)
    } else if (sortBy === "author") {
      sort = { author: 1 }; // Sort by author name (ascending)
    } else if (sortBy === "location") {
      sort = { "user.location": 1 }; // Sort by user location (ascending)
    } else {
      sort = { title: 1 }; // Default sort by title (ascending)
    }

    let filter = {};
    if (filterCriteria.user_id) {
      filter["user._id"] = new ObjectId(filterCriteria.user_id);
    }

    return await Book.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre",
        },
      },
      { $unwind: "$genre" },
      { $match: filter },
      { $sort: sort },
    ]);
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};

const insertBook = (newBook) => {
  return new Book(newBook).save().catch((err) => {
    console.error("Error inserting book:", err);
    throw err;
  });
};

const findBookById = (id) => {
  return Book.findById(id)
    .populate("genre", "name")
    .populate("user")
    .catch((err) => {
      console.error("Error fetching book by Id:", err);
      throw err;
    });
};

module.exports = { findAllBooks, insertBook, findBookById };
