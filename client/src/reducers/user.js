import {
  GET_ORDERS_USER, CLEAR_ORDERS_USER, GET_DELIVERED_ORDERS
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    
    case GET_ORDERS_USER:
      return {
        ...state,
        orders: action.payload
      }
    
    case CLEAR_ORDERS_USER:
      return {
        ...state,
        orders: [],
        delivereds: []
      }

    case GET_DELIVERED_ORDERS:
      return {
        ...state,
        delivereds: action.payload
      }
    default:
      return state;
  } 
}