const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'No description available.'
  }
});
module.exports = mongoose.model('Movie', movieSchema, 'movies');