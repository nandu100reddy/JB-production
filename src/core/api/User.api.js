
import ApiBase from './ApiBase';
import config from "../../config.json";

class UserApi {

  static urls = `${config.Backend_URL}/api`;


  /**
   * @params {Object} Payload - User Details Object data
   */

  static loginDetails = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/login`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /**
   * @params {Object} Payload - User Details Object data
   */

  static signUpDetails = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/register`, payload);
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

  /*
   * @params {Object} Payload - User email-id details Object data
  */

  static forgetPasswordDetails = async payload => {
    try {
      return await ApiBase.post(`${this.urls}/user/forgetpassword`, payload);
    } catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }

}



export default UserApi;