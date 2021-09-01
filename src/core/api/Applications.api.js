import ApiBase from "./ApiBase";
import config from "../../config.json";

class ApplicationsApi {
  static urls = `${config.Backend_URL}/api`;

  /**
   * @params {Object} Payload - object Details Object data
   */

  static getApplications = async () => {
    try {
      return await ApiBase.get(`${this.urls}/application`, "");
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {alphanumeric} id - id of application object
   */

  static getApplicationById = async (id) => {
    try {
      return await ApiBase.get(`${this.urls}/application/${id}`, {
        headers: {
          master: 1,
        },
      });
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {alphaNumeric} id - Application Id
   */
  static getObjectByApplicationId = async (id) => {
    try {
      return await ApiBase.get(`${this.urls}/application/${id}/objects/`, {
        headers: {
          master: 1,
        },
      });
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Object} Payload - Application Details Object data for create
   */

  static createApplication = async (payload) => {
    try {
      return await ApiBase.post(`${this.urls}/application`, payload);
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Object} Payload - Application Details Object data for update
   */

  static updateApplication = async (payload) => {
    try {
      return await ApiBase.post(
        `${this.urls}/application/${payload._id}`,
        payload
      );
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Object} Payload - Application Id and Selected Object to display Object data for update
   */

  static updateApplicationSelectedObjectToDisplay = async (payload) => {
    try {
      return await ApiBase.put(
        `${this.urls}/api/object/selectedObjects`,
        payload
      );
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };
}

export default ApplicationsApi;
