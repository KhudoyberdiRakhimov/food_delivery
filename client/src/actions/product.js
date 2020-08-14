import axios from 'axios'
import { setAlert } from './alert'

import {
  UPLOAD_PRODUCT,
} from './types'

export const uploadProduct = (
  formData,
  // history,
  // edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/product/uploadProduct', formData, config);

    dispatch({
      type: UPLOAD_PRODUCT,
      payload: res.data
    }); 

    setAlert('Product Uploaded', 'success');

    // if (!edit) {
    // history.push('/dashboard');
    // }
  } catch (err) {
    const errors = err.errors;
    // const errors = err.response.data.errors;
    console.error(err)
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};