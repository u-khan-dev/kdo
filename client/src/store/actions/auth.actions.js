import api from '../../utils/api.js';
import setAuthToken from '../../utils/setAuthToken.js';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './actionTypes';

import { setAlert } from './alert.actions.js';

// load user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem('token'))
    setAuthToken(localStorage.getItem('token'));

  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// register user
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));

    dispatch({ type: REGISTER_FAIL });
  }
};

// login user
export const login = formData => async dispatch => {
  try {
    const res = await api.post('/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// logout user
export const logout = () => async dispatch => dispatch({ type: LOGOUT });
