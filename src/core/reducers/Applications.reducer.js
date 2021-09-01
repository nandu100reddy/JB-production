import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const applications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPLICATION_CREATE_REQUEST:
      return {
        ...state,
        createdApplication: action.application
      };
    case actionTypes.APPLICATION_GET_REQUEST:
      return {
        ...state,
        applications: action.applications
      };
    case actionTypes.APPLICATION_GET_REQUEST_BY_ID:
      return {
        ...state,
        application: action.application
      };
    case actionTypes.OBJECT_GET_REQUEST_BY_APPLICATION_ID:
      return {
        ...state,
        applicationObject: action.applicationObject
      };
    default:
      return {
        ...state
      }
  }
}

export default applications;