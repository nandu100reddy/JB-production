import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_LOGIN_REQUEST:
      return {
        ...state,
        loginUserData: action.loginUserData
      };
    case actionTypes.USERS_REGISTER_REQUEST:
      return {
        ...state,
        loginUserData: action.registerUserData
      };
    default:
      return {
        ...state
      }
  }
}

export default user;