import axios from 'axios'
import {
  GET_ORDERS_USER
} from './types'

export const getOrdersUser = () => async dispatch => {
  
  try {
    
    const res = await axios.get('/api/order')
    console.log('Fuck messsage from getOrdersUserACTION')
    console.log(res.data)
    dispatch({
      type: GET_ORDERS_USER,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}