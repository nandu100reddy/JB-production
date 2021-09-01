import * as types from "./ActionTypes";
import FieldsApi from '../api/Fields.api';

/**
 * ACTION OBJECTS
 */


export const loadFieldsSuccess = fields => {
  return {
    type: types.FIELD_GET_REQUEST,
    fields
  }
}


export const loadFieldByIdSuccess = field => {
  return {
    type: types.FIELD_GET_REQUEST_BY_ID,
    field
  }
}


/**
 * 
 * @params {Object} fieldData - Field related details
 */

export const createFieldSuccess = field => {
  return {
    type: types.FIELD_CREATE_REQUEST,
    field
  }
}

/**
 * ACTION DISPATCHERS
 */


/**
 * Load  Fields details and  Dispatch Action 
 */

export const loadFields = () => {
  return async dispatch => {
    try {
      const data = await FieldsApi.getFields();
      dispatch(loadFieldsSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Load  Field details and  Dispatch Action 
 */

export const loadFieldById = (id) => {
  return async dispatch => {
    try {
      const data = await FieldsApi.getFieldById(id);
      dispatch(loadFieldByIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Create Field and Dispatch Action 
 * @params {Object} payload 
 */

export const createField = (payload) => {
  return async dispatch => {
    try {
      const data = await FieldsApi.createField(payload);
      dispatch(createFieldSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Update Field and Dispatch Action 
 * @params {Object} payload 
 */

export const updateField = (id, payload) => {
  return async dispatch => {
    try {
      const data = await FieldsApi.updateField(id, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}


/**
 * Delete Field and Dispatch Action 
 * @params {Object} payload 
 */

export const deleteField = (payload) => {
  return async dispatch => {
    try {
      const data = await FieldsApi.deleteField(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}