const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/authV')

const User = require('../../models/User');
const Visitor = require('../../models/Visitor');

// @route    POST api/users/profile
// @desc     Update user info
// @access   Private
router.post('/profile', auth, async (req, res) => {
  const { organization, phone, address, images, logos } = req.body
  
  try {
    let user = await User.update(
      { _id: req.body.user },
      {
        $set: {
          organization: organization,
          phone: phone,
          address: address,
          images: images,
          logos: logos,
        },
      }
    )
    res.status(201).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] }); 
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            success: true,
            message: 'User created!',
            errors: [],
          });
        }
      ); 
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/visitor
// @desc     Register visitor
// @access   Public
router.post(
  '/visitor',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address } = req.body;

    try {
      let visitor = await Visitor.findOne({ email });

      if (visitor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      visitor = new Visitor({
        name,
        email,
        password,
        address
      });

      const salt = await bcrypt.genSalt(10);

      visitor.password = await bcrypt.hash(password, salt);

      await visitor.save();

      const payload = {
        visitor: {
          id: visitor.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            success: true,
            message: 'User created!',
            errors: [],
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users/addToCart
// @desc     Add product to cart
// @access   Private
router.get('/addToCart', auth, (req, res) => {

  Visitor.findOne({ _id: req.visitor.id }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    })

    if (duplicate) {
      Visitor.findOneAndUpdate(
        { _id: req.visitor.id, "cart.id": req.query.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart)
        }
      )
    } else {
      Visitor.findOneAndUpdate(
        { _id: req.visitor.id },
        {
          $push: { 
            cart: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart)
        }
      )
    }
  })
});

// @route    GET api/users/removeFromCart
// @desc     Remove product from cart
// @access   Private
router.get('/removeFromCart', auth, (req, res) => {

  Visitor.findOneAndUpdate(
    { _id: req.visitor.id },
    {
      "$pull":
        { "cart": { "id": req.query._id } }
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map(item => {
        return item.id
      })

      Product.find({ '_id': { $in: array } })
        .populate('user')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          })
        })
    }
  )
})

// @route    GET api/users/userCartInfo
// @desc     Cart information
// @access   Private
router.get('/userCartInfo', auth, (req, res) => {
  Visitor.findOne(
    { _id: req.visitor.id },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map(item => {
        return item.id
      })


      Product.find({ '_id': { $in: array } })
        .populate('user')
        .exec((err, cartDetail) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json({ success: true, cartDetail, cart })
        })

    }
  )
})

module.exports = router;
