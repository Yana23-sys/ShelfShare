// controllers/genreController.js
const { findAllGenres, getAllGenres } = require("../models/genres");

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    res.status(200).send({ genres });
  } catch (error) {
    console.error("Error fetching genres:", error);
    next(error);
  }
};
