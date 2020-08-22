const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  visitorId: {
    type: String
  },
  quantity: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
  }
})

module.exports = Order = mongoose.model('order', OrderSchema);
