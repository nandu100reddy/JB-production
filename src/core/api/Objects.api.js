
import ApiBase from './ApiBase';
import config from "../../config.json";

class ObjectsApi {

  static urls = `${config.Backend_URL}/api`;

  static getObjects = async () => {
    try {
      return await ApiBase.get(`${this.urls}/object`, '');
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} id - Object Id
   */
  static getObjectById = async (id, applicationId) => {
    const params = applicationId ? {
      headers: {
        'master': 1
      }
    } : '';
    try {
      return await ApiBase.get(`${this.urls}/object/${id}`, params);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }


  /**
   * @params {Object} id - Object Id
   */
  static getFieldsByObjectId = async (id, applicationId) => {
    const params = applicationId ? {
      headers: {
        'master': 1
      },
      params: {
        "application_id": applicationId,
        "object_id": id
      }
    } : {
        params: {
          "application_id": applicationId,
          "object_id": id
        }
      };

    try {
      return await ApiBase.get(`${this.urls}/object/${id}/fields`, params);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }


  /**
   * @params {Object} payload - Object data
   */
  static createObjectDetails = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/object`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} payload - Object data for update
   */
  static updateObject = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/object/${payload._id}`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} payload - Object data for update
   */
  static deleteObject = async id => {
    try {
      return await ApiBase.delete(`${this.urls}/object/${id}`, '');
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }
}

export default ObjectsApi;