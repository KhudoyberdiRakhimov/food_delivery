const express = require('express')
const router = express.Router()
const authV = require('../../middleware/authV')
const auth = require('../../middleware/auth')

const Order = require('../../models/Order')
const Visitor = require('../../models/Visitor')

// @route POST api/order
// @desc Add order to DB
// @access Private
router.post('/', authV, async (req, res) => {

  try {

    const orders = await Order.insertMany(req.body)
    
    const filter = { _id: req.visitor.id }
    const updateDocument = {
      $set: {
        cart: []
      }
    }
    const visitor = await Visitor.updateOne(filter, updateDocument)

    res.status(200).json(orders)

  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

// @route GET api/order
// @desc Get orders of user
// @access Private
router.get('/', auth, async (req, res) => {
  
  try {
    
    const orders = await Order.find({
      userId: req.user.id,
      isDelivered: false
    })
    console.log(orders)
    res.status(200).json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

module.exports = router