import Axios from 'axios';

function ApiBase() {

  /**
   * @param {string} url - Url of GET call 
   * @param {Object} params - params object of GET call
   */
  this.get = (url, params) => {
    return Axios.get(url, params);
  }

  /**
  * @param {string} url - Url of POST call 
  * @param {Object} payload - payload object of post call
  */
  this.post = (url, payload) => {
    return Axios.post(url, payload);
  }

  /**
  * @param {string} url - Url of PUT call 
  * @param {Object} payload - params object of PUT call
  */
  this.put = (url, payload) => {
    return Axios.put(url, payload);
  }

  /**
  * @param {string} url - Url of DELETE call 
  * @param {Object} payload - params object of DELETE call
  */
   this.delete = (url, payload) => {
    return Axios.delete(url, payload);
  }
}

export default new ApiBase();