
import ApiBase from './ApiBase';
import config from "../../config.json";

class RecordsApi {

  static urls = `${config.Backend_URL}/api`;

  static getRecords = async (objectId, applicationId) => {
    try {
      return await ApiBase.get(`${this.urls}/object-data`, {
        headers: {
          'master': 1
        },
        params: {
          "application_id": applicationId,
          "object_id": objectId
        }
      });
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {alphanumeric} id - Record Id
   */
  static getRecordById = async (id, objectId, applicationId) => {
    const params = applicationId ? {
      headers: {
        'master': 1
      },
      params: {
        "application_id": applicationId,
        "object_id": objectId
      }
    } : {
        params: {
          "application_id": applicationId,
          "object_id": objectId
        }
      };
    try {
      return await ApiBase.get(`${this.urls}/object-data/${id}`, params);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }



  /**
   * @params {object} payload - Data for create new record
   */
  static createRecord = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/object-data`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} payload - Record Data for update
   */
  static updateRecord = async (id, payload) => {
    try {
      return await ApiBase.post(`${this.urls}/object-data/${id}`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} id - Record Id
   */
  static deleteRecord = async id => {
    try {
      return await ApiBase.delete(`${this.urls}/object-data/${id}`, '');
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params - get related list by record id
   */

  static getRelatedListByRecordId = async (objectId) => {
    try {
      return await ApiBase.get(`${this.urls}/object/${objectId}/relatedList`, {
        headers: {
          'master': 1
        }
      });
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }
}

export default RecordsApi;