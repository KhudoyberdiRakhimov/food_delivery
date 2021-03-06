const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
