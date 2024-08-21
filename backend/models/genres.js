const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
})

const Genre = mongoose.model('Genre', genreSchema)

const findGenreByName = (name) => {
  return Genre.findOne({ name })
}

module.exports = { Genre, findGenreByName }