import * as types from "./ActionTypes";
import ApplicationsApi from "../api/Applications.api";

/**
 * ACTION OBJECTS
 */

export const loadApplicationsSuccess = (applications) => {
  return {
    type: types.APPLICATION_GET_REQUEST,
    applications,
  };
};

export const loadApplicationByIdSuccess = (application) => {
  return {
    type: types.APPLICATION_GET_REQUEST_BY_ID,
    application,
  };
};

export const loadObjectByApplicationIdSuccess = (applicationObject) => {
  return {
    type: types.OBJECT_GET_REQUEST_BY_APPLICATION_ID,
    applicationObject,
  };
};

/**
 *
 * @params {Object} applicationData - Application related details
 */

export const createApplicationSuccess = (application) => {
  return {
    type: types.APPLICATION_CREATE_REQUEST,
    application,
  };
};

/**
 * ACTION DISPATCHERS
 */

/**
 * Load  Applications details and  Dispatch Action
 */

export const loadApplications = () => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.getApplications();
      dispatch(loadApplicationsSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Load  Application details and  Dispatch Action
 */

export const loadApplicationById = (id) => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.getApplicationById(id);
      dispatch(loadApplicationByIdSuccess(data));
      return data;
      
    } catch (error) {
      throw error;
    }
  };
};
/**
 * Load  Application details and  Dispatch Action
 */

export const loadObjectByApplicationId = (id) => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.getObjectByApplicationId(id);
      dispatch(loadObjectByApplicationIdSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Create Application and Dispatch Action
 * @params {Object} payload
 */

export const createApplication = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.createApplication(payload);
      dispatch(createApplicationSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Update Application and Dispatch Action
 * @params {Object} payload
 */

export const updateApplication = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.updateApplication(payload);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Update Application Selected Object To Display and Dispatch Action
 * @params {Object} payload
 */

export const updateApplicationSelectedObjectToDisplay = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ApplicationsApi.updateApplication(payload);
      return data;
    } catch (error) {
      throw error;
    }
  };
};
