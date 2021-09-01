import * as types from "./ActionTypes";
import LayoutsApi from '../api/Layouts.api';

/**
 * ACTION OBJECTS
 */

/**
 * @param {Array} sidebar - setup sidebar
 */

export const getSidebarSuccess = sidebar => {
  return {
    type: types.SIDEBAR_GET_REQUEST,
    sidebar
  }
}

/**
 * ACTION DISPATCHERS
 */

/**
 * Load sidebar details and  Dispatch Action 
 */
export const getSidebar = () => {
  return async dispatch => {
    try {
      const data = await LayoutsApi.getSideBar();
      dispatch(getSidebarSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}
