const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  orders: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    default: ''
  },
  organization: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: ''
  },
  images: {
    type: Array,
    default: []
  },
  logos: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
