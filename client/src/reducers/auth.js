import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  VISITOR_LOADED,
  REGISTER_VISITOR_SUCCESS,
  LOGIN_VISITOR_SUCCESS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isVisitorAuth: null,
  visitor: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case VISITOR_LOADED:
      return {
        ...state,
        isVisitorAuth: true,
        loading: false,
        visitor: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_VISITOR_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isVisitorAuth: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_VISITOR_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isVisitorAuth: true,
        loading: false
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        isVisitorAuth: false,
        visitor: null
      };
    default:
      return state;
  }
}