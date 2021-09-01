
import ApiBase from './ApiBase';
import config from "../../config.json";

class FieldsApi {

  static urls = `${config.Backend_URL}/api`;


  /**
   * @params {Object} Payload - object Details Object data
   */

  static getFields = async () => {
    try {
      return await ApiBase.get(`${this.urls}/field`, '');
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }


  /**
   * @params {alphanumeric} id - id of field object
   */

  static getFieldById = async (id) => {
    try {
      return await ApiBase.get(`${this.urls}/field/${id}`, {
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

  /**
   * @params {Object} Payload - Field Details Object data for create
   */

  static createField = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/field`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} Payload - Field Details Object data for update
   */

  static updateField = async (id, payload) => {
    try {
      return await ApiBase.post(`${this.urls}/field/${id}`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }


  /**
   * @params {Object} Payload - Field Details Object data for Delete
   */

  static DeleteField = async payload => {
    try {
      return await ApiBase.delete(`${this.urls}/field/${payload._id}`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }
}


export default FieldsApi;