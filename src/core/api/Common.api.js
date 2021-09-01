import ApiBase from "./ApiBase";
import config from "../../config.json";

class CommonApi {
  static urls = `${config.Backend_URL}/api`;

  /**
   * @params {alphaNumeric} - applicationId/objectId/fieldId
   * @params {string} - searchData
   */
  static getLookupDataListBySearchString = async (applicationId, objectId, fieldId, searchData) => {
    try {
      return await ApiBase.get(`${this.urls}/object-data/lookup`, {
        headers: {
          master: 1,
        },
        params: {
          "application_id": applicationId,
          "object_id": objectId,
          "field_id": fieldId,
          "searchData": searchData
        }
      });
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };
}


export default CommonApi;
