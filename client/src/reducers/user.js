import {
  GET_ORDERS_USER, CLEAR_ORDERS_USER
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
        orders: []
      }
    default:
      return state;
  } 
}