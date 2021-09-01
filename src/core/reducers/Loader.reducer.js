import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const loader = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader
      };
    default:
      return {
        ...state
      }
  }
}

export default loader;