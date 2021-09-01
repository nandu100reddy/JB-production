import * as actionTypes from "../actions/ActionTypes";
import initialState from './initialState';

const records = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECORDS_GET_REQUEST:
      return {
        ...state,
        records: action.records
      };
    case actionTypes.RECORD_GET_REQUEST_BY_ID:
      return {
        ...state,
        record: action.record
      };
    case actionTypes.RECORD_CREATE_REQUEST:
      return {
        ...state,
        createdRecord: action.createRecord
      };
    case actionTypes.RECORD_GET_REQUEST_BY_OBJECT_ID:
      return {
        ...state,
        objectRecords: action.objectRecords
      };
    case actionTypes.RECORD_DELETE_REQUEST_BY_ID:
      return {
        ...state,
        record: action.record
      };
    case actionTypes.GET_RELATED_LIST_BY_RECORD_ID:
      return {
        ...state,
        recordRelatedList: action.relatedList
      };

    default:
      return {
        ...state
      }
  }
}

export default records;