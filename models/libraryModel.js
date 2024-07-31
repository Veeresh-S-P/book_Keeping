const mongoose = require('mongoose');

const librarySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
}, {
  timestamps: true,
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
