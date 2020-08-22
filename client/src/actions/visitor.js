import axios from 'axios'
import {
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ORDER_PRODUCT
} from './types'

export const addToCart = (_id) => async dispatch => {

  try {
    const res = await axios.get(`/api/users/addToCart?productId=${_id}`)
    
    dispatch({
      type: ADD_TO_CART_USER,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const getCartItems = (cartItems, userCart) => async dispatch => {
  console.log('FUCK Message from getCartItemsACTIONS')
  const res =  await axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)

      // Make CartDetail inside Redux Store 
      // We need to add quantity data to Product Information that come from Product Collection. 

      userCart.forEach(cartItem => {
        res.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            res.data[i].quantity = cartItem.quantity;
          }
        })
      })
  dispatch ({
    type: GET_CART_ITEMS_USER,
    payload: res.data
  })
}

export const removeCartItem = (id) => async dispatch => {
  console.log('FUCK Message from removeCartItemACTIONS')
  const res = await axios.get(`/api/users/removeFromCart?_id=${id}`)

  res.data.cart.forEach(item => {
    res.data.cartDetail.forEach((k, i) => {
      if (item.id === k._id) {
        res.data.cartDetail[i].quantity = item.quantity
      }
    })
  })
  dispatch({
    type: REMOVE_CART_ITEM_USER,
    payload: res.data
  })
}

export const orderProduct = (orderInfo) => async dispatch => {
  console.log('Fuck message from "ACTIONS: orderProduct"')

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(orderInfo)
  console.log(body)
  try {
    const res = await axios.post(`/api/order`, body, config)

    dispatch({
      type: ORDER_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }

}