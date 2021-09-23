import {
  GET_LISTS,
  ADD_LIST,
  DELETE_LIST,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
  LIST_ERROR
} from '../actions/actionTypes.js';

const initialState = {
  lists: [],
  loading: true,
  error: {}
};

const list = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LISTS:
      return { ...state, lists: payload, loading: false };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload],
        loading: false
      };
    case LIST_ERROR:
      return { ...state, error: payload, loading: false };
    case ADD_LIST_ITEM:
      return {
        ...state,
        lists: [
          ...state.lists.map(list =>
            list._id === payload.id
              ? { ...list, listItems: payload.data }
              : list
          )
        ],
        loading: false
      };
    case DELETE_LIST_ITEM:
      return {
        ...state,
        lists: [
          ...state.lists.map(list =>
            list._id === payload.id
              ? {
                  ...list,
                  listItems: list.listItems.filter(
                    (_, index) => index !== payload.index
                  )
                }
              : list
          )
        ],
        loading: false
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list._id !== payload),
        loading: false
      };
    default:
      return state;
  }
};

export default list;
