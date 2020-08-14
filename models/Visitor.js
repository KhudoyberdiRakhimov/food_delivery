const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: {
    type: Array,
    default: []
  },
  address: {
    type: String,
    required: true,
  }
});

module.exports = Visitor = mongoose.model('visitor', VisitorSchema);