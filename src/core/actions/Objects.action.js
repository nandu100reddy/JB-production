import * as types from "./ActionTypes";
import ObjectsApi from '../api/Objects.api';

/**
 * ACTION OBJECTS
 */

/**
 * @param {Array} objects - Object related all List information
 */

export const getObjectsSuccess = objects => {
  return {
    type: types.OBJECT_GET_REQUEST,
    objects
  }
}

/**
 * @param {Array} objects - Object related all List information
 */

export const getObjectByIdSuccess = object => {
  return {
    type: types.OBJECT_GET_REQUEST_BY_ID,
    object
  }
}
/**
 * @param {Array} objects - Object related all List information
 */

export const getFieldsByObjectIdSuccess = objectFields => {
  return {
    type: types.FIELDS_GET_REQUEST_BY_OBJECT_ID,
    objectFields
  }
}




export const createObjectSuccess = createObjectData => {
  return {
    type: types.OBJECT_CREATE_REQUEST,
    createObjectData
  }
}

export const deleteObjectSuccess = (object, payload) => {
  return {
    type: types.OBJECT_DELETE_REQUEST_BY_ID,
    object,
    payload
  }
}


/**
 * ACTION DISPATCHERS
 */

/**
 * Load all Object list details and  Dispatch Action 
 */

export const getObjects = () => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.getObjects();
      dispatch(getObjectsSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Load single Object details and Dispatch Action 
 */

export const getObjectById = (id, applicationId) => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.getObjectById(id, applicationId);
      dispatch(getObjectByIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Load single Object details and Dispatch Action 
 */

export const getFieldsByObjectId = (id, application_id) => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.getFieldsByObjectId(id, application_id);
      dispatch(getFieldsByObjectIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}


/**
 * Create Object and Dispatch Action 
 * @params {Object} payload 
 */

export const createObject = (payload) => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.createObjectDetails(payload);
      dispatch(createObjectSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Update Object and Dispatch Action 
 * @params {Object} payload 
 */

export const updateObject = (payload) => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.updateObject(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Delete Object and Dispatch Action 
 * @params {Object} payload 
 */

export const deleteObject = (payload) => {
  return async dispatch => {
    try {
      const data = await ObjectsApi.deleteObject(payload);
      dispatch(deleteObjectSuccess(data, payload));
      return data;
    } catch (error) {
      throw error;
    }
  }
}