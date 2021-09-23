import {
  GET_LISTS,
  ADD_LIST,
  DELETE_LIST,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
  LIST_ERROR
} from './actionTypes.js';

import api from '../../utils/api.js';
import { setAlert } from './alert.actions.js';

// Get lists
export const getLists = () => async dispatch => {
  try {
    const res = await api.get('/lists');

    dispatch({
      type: GET_LISTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Add list
export const addList = formData => async dispatch => {
  try {
    const res = await api.post('/lists', formData);

    dispatch({
      type: ADD_LIST,
      payload: res.data
    });

    dispatch(setAlert(`list ${res.data.name} created`, 'success'));
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: {
        message: 'err.response.statusText',
        status: err.response.status
      }
    });
  }
};

// Delete list
export const deleteList = id => async dispatch => {
  try {
    await api.delete(`/lists/${id}`);
    dispatch({ type: DELETE_LIST, payload: id });
    dispatch(setAlert('list deleted', 'success'));
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Add list item
export const addListItem = (listId, text) => async dispatch => {
  try {
    const res = await api.post(`/lists/${listId}`, text); // returns all list items after adding new item

    dispatch({
      type: ADD_LIST_ITEM,
      payload: { id: listId, data: res.data }
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete list item
export const deleteListItem = (listId, itemIndex) => async dispatch => {
  try {
    await api.delete(`/lists/items/${listId}/${itemIndex}`);

    dispatch({
      type: DELETE_LIST_ITEM,
      payload: { id: listId, index: itemIndex }
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};
