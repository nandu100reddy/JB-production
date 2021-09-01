import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const fields = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIELD_CREATE_REQUEST:
      return {
        ...state,
        createdField: action.field
      };
    case actionTypes.FIELD_GET_REQUEST:
      return {
        ...state,
        fields: action.fields
      };
    case actionTypes.FIELD_GET_REQUEST_BY_ID:
      return {
        ...state,
        field: action.field
      };
    default:
      return {
        ...state
      }
  }
}

export default fields;