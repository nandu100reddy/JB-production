import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const layouts = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SIDEBAR_GET_REQUEST:
      return {
        ...state,
        sidebar: action.sidebar
      };
    default:
      return {
        ...state
      }
  }
}

export default layouts;