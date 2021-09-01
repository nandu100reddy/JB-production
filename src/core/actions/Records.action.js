import * as types from "./ActionTypes";
import RecordsApi from '../api/Records.api';

/**
 * ACTION OBJECTS
 */


/**
 * 
 * @params {Array} recordData - Record
 */

export const getRecordsSuccess = records => {
  return {
    type: types.RECORDS_GET_REQUEST,
    records
  }
}

/**
 * @param {Object} singleRecord - Single Record
 */

export const getRecordByIdSuccess = record => {
  return {
    type: types.RECORD_GET_REQUEST_BY_ID,
    record
  }
}

/**
 * @param {Object} get related list by Record id 
 */

export const getRelatedListByRecordIdSuccess = relatedList => {
  return {
    type: types.GET_RELATED_LIST_BY_RECORD_ID,
    relatedList
  }
}


export const createRecordSuccess = createRecord => {
  return {
    type: types.RECORD_CREATE_REQUEST,
    createRecord
  }
}

export const deleteRecordSuccess = record => {
  return {
    type: types.RECORD_DELETE_REQUEST_BY_ID,
    record
  }
}


/**
 * ACTION DISPATCHERS
 */

/**
 * Load Record and  Dispatch Action 
 */

export const getRecords = (objectId, applicationId) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.getRecords(objectId, applicationId);
      dispatch(getRecordsSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Load Record and Dispatch Action 
 * @params {alphanumeric} id 
 */

export const getRecordById = (id, objectId, applicationId) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.getRecordById(id, objectId, applicationId);
      dispatch(getRecordByIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Load Related List by Record ID and  Dispatch Action 
 * @params {alphanumeric} id 
 */

export const getRelatedListByRecordId = (objectId) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.getRelatedListByRecordId(objectId);
      dispatch(getRelatedListByRecordIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}



/**
 * Create Record and Dispatch Action 
 * @params {object} payload 
 */

export const createRecord = (payload) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.createRecord(payload);
      dispatch(createRecordSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Update Record and Dispatch Action 
 * @params {Object} payload 
 */

export const updateRecord = (id, payload) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.updateRecord(id, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Delete  Record and Dispatch Action 
 * @params {object} payload 
 */

export const deleteRecord = (id) => {
  return async dispatch => {
    try {
      const data = await RecordsApi.deleteRecord(id);
      dispatch(deleteRecordSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}