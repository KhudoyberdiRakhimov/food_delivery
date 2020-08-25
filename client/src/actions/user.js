import axios from 'axios'
import {
  GET_ORDERS_USER,
  GET_DELIVERED_ORDERS
} from './types'

export const getOrdersUser = () => async dispatch => {
  
  try {
    
    const res = await axios.get('/api/order')
    console.log('Fuck message from getOrdersUserACTION')
    console.log(res.data)
    dispatch({
      type: GET_ORDERS_USER,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const productDelivered = (productId) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/order/delivered?productId=${productId}`)
    console.log('Message from productDeliveredACTION')
    console.log(res.data)
    dispatch({
      type: GET_ORDERS_USER,
      payload: res.data
    })    
  } catch (err) {
    console.error(err)
  }
}

export const getDeliveredOrders = () => async dispatch => {
  
  try {
    const res = await axios.get(`/api/order/delivereds`)
    console.log('Message from getDeliveredOrdersACTION')
    console.log(res.data)
    dispatch({
      type: GET_DELIVERED_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const removeOrder = (productId) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/order/delivereds?productId=${productId}`)
    console.log('Message from removeOrderACTION')
    console.log(res.data)
    dispatch({
      type: GET_DELIVERED_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}