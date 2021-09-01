import * as types from "./ActionTypes";
import UserApi from '../api/User.api';

/**
 * ACTION OBJECTS
 */

/**
 * 
 * @param {Object} loginUserData - User related all information
 */

export const loadLoginUserSuccess = loginUserData => {
    return {
        type: types.USERS_LOGIN_REQUEST,
        loginUserData
    }
}
/**
 * 
 * @param {Object} userData - User related all information
 */

export const loadSignUpUserSuccess = registerUserData => {
    return {
        type: types.USERS_REGISTER_REQUEST,
        registerUserData
    }
}

/**
 * ACTION DISPATCHERS
 */

/**
 * Load all User Dispatch Action 
 */
export const setUserDetailsInStore = (userDetails) => {
    return async dispatch => {
        try {
            dispatch(loadLoginUserSuccess(userDetails));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
/**
 * Load all User Dispatch Action 
 */
export const loginDetails = (payload) => {
    return async dispatch => {
        try {
            const loginUserData = await UserApi.loginDetails(payload);
            dispatch(loadLoginUserSuccess(loginUserData));
            return loginUserData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


export const signUpDetails = (payload) => {
    return async dispatch => {
        try {
            const registerUserData = await UserApi.signUpDetails(payload);
            dispatch(loadSignUpUserSuccess(registerUserData));
            return registerUserData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const forgetPasswordDetails = (payload) => {
    return async dispatch => {
        try {
            const forgetPasswordData = await UserApi.forgetPasswordDetails(payload);
            return forgetPasswordData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


