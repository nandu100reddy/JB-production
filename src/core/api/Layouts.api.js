
import ApiBase from './ApiBase';
import config from "../../config.json";

class LayoutsApi {

  static urls = `${config.Backend_URL}/api`;

  static getSideBar = async () => {
    try {
      return await ApiBase.get(`${this.urls}/sidebar`, '');
    }
    catch (error) {
      console.log("API Error" + error)
      throw error;
    }
  }
}

export default LayoutsApi;