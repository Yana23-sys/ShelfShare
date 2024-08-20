const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
});

const User = mongoose.model('User', userSchema);

const findUserByName = (username) => {
  return User.findOne({ username })
}

module.exports = { User, findUserByName }