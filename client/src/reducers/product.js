import {
  UPLOAD_PRODUCT,
} from '../actions/types'

const initialState = {
  product: null,
  loading: true
}

export default function (state = initialState, action) {
  
  const { type, payload } = action
  
  switch (type) {
    case UPLOAD_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    default:
      return state;
  }
}