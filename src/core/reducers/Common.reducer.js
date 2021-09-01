import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const common = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOOKUP_GET_REQUEST:
      return {
        ...state,
        lookupList: action.lookupList
      };
    default:
      return {
        ...state
      }
  }
}

export default common;