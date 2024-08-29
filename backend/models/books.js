const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String },
  publication_year: { type: String },
  posted_date: { type: Date, default: Date.now }, 
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  cover_image_url: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

const findAllBooks = async (sortCriteria = {}, filterCriteria = {}, page = 1, pageSize = 10) => {
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
      filter['user._id'] = ObjectId.createFromHexString(filterCriteria.user_id)
    }

    if (filterCriteria.location) {
      filter['user.location'] = filterCriteria.location
    }

    // Count total books before applying pagination
    const totalBooks = await Book.countDocuments(filter);

    // Calculate pagination data
    const totalPages = Math.ceil(totalBooks / pageSize);
    const skip = (page - 1) * pageSize;

    const books = await Book.aggregate([
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
      { $skip: skip }, // Skip documents based on the page number
      { $limit: pageSize } // Limit the number of documents returned
    ]);

    return { books, totalBooks, totalPages };
  } 
  catch (err) {
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
