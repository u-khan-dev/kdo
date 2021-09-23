import { combineReducers } from 'redux';
import auth from './auth.reducer.js';
import alert from './alert.reducer.js';
import list from './list.reducer.js';

export default combineReducers({ auth, alert, list });
