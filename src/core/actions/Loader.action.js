import * as types from "./ActionTypes";

/**
 * ACTION OBJECTS
 */

/**
 * 
 * @param {Boolean} showLoader  - User related all information
 */

export const loadLoaderSuccess = showLoader => {
  return {
    type: types.SHOW_LOADER,
    showLoader
  }
}

/**
 * ACTION DISPATCHERS
 */

/**
 * Load  Loader Dispatch Action 
 */

export const loadLoader = (showLoader) => {
  return async dispatch => {
    try {
      dispatch(loadLoaderSuccess(showLoader));
      return showLoader;
    } catch (error) {
      throw error;
    }
  }
}