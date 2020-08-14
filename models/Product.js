const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  deliveryPrice: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  },
  category: {
    type: Number,
    default: 1
  }
});

ProductSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  }
})

module.exports = Product = mongoose.model('product', ProductSchema);
