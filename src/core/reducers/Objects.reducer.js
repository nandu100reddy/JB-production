import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const objects = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.OBJECT_GET_REQUEST:
      return {
        ...state,
        objects: action.objects
      };
    case actionTypes.OBJECT_GET_REQUEST_BY_ID:
      return {
        ...state,
        object: action.object
      };
    case actionTypes.FIELDS_GET_REQUEST_BY_OBJECT_ID:
      return {
        ...state,
        objectFields: action.objectFields
      };
    case actionTypes.OBJECT_CREATE_REQUEST:
      return {
        ...state,
        createObjectData: action.createObjectData
      };
    case actionTypes.OBJECT_DELETE_REQUEST_BY_ID:
      return {
        ...state,
        objects: state.objects.data.result.filter(i => i._id !== action.payload)
      };

    default:
      return {
        ...state
      }
  }
}

export default objects;