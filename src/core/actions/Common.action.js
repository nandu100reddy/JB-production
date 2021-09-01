import * as types from "./ActionTypes";
import CommonApi from "../api/Common.api";

/**
 * ACTION OBJECTS
 */

export const loadLookupDataListSuccess = (lookupList) => {
  return {
    type: types.LOOKUP_GET_REQUEST,
    lookupList,
  };
};

/**
 * ACTION DISPATCHERS
 */

/**
 * Load  Lookup data list details and  Dispatch Action
 */

export const loadLookupDataList = (applicationId, objectId, fieldId, searchData) => {
  return async (dispatch) => {
    try {
      const data = await CommonApi.getLookupDataListBySearchString(applicationId, objectId, fieldId, searchData);
      dispatch(loadLookupDataListSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

