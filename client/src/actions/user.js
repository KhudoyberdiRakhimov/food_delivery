import axios from 'axios'
import {
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
} from './types'

export const addToCart = ( _id, visitorId ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ _id, visitorId })
  console.log(body)

  try {
    const res = await axios.post(`/api/users/addToCart`, body, config)

    dispatch({
      type: ADD_TO_CART_USER,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(response => {

      //Make CartDetail inside Redux Store 
      // We need to add quantity data to Product Information that come from Product Collection. 

      userCart.forEach(cartItem => {
        response.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            response.data[i].quantity = cartItem.quantity;
          }
        })
      })

      return response.data;
    });

  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  }
}

export function removeCartItem(id) {
  const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
    .then(response => {

      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity
          }
        })
      })
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  }
}
