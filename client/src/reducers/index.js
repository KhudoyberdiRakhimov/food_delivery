import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import product from './product';
import visitor from './visitor';
import user from './user';

export default combineReducers({
  alert,
  auth,
  profile,
  product,
  visitor,
  user,
});