import ApiBase from "./ApiBase";
import config from "../../config.json";

class ChatApi {
  static urls = `${config.Backend_CHAT_URL}/api`;

  static getPosts = async (id) => {
    try {
      return await ApiBase.get(`${this.urls}/feed/${id}`, "");
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Post} id - Post Id
   */
  static getPostById = async (id, applicationId) => {
    const params = applicationId
      ? {
          headers: {
            master: 1,
          },
        }
      : "";
    try {
      // return await ApiBase.get(`${this.urls}/object/${id}`, params);
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Post} payload - Post data
   */
  static createPost = async (payload) => {
    try {
      return await ApiBase.post(`${this.urls}/feed`, payload);
    } catch (error) {
      console.log("API Error" + error);
      throw error;
    }
  };

  /**
   * @params {Post} payload - Post data
   */
  static createComment = async (payload) => {
    try {
      return await ApiBase.post(`${this.urls}/comment`, payload);
    } catch (error) {
      throw error;
    }
  };

  /**
   * @params {Post} payload - Post data for update
   */
  static deletePost = async (id) => {
    try {
      // return await ApiBase.delete(`${this.urls}/object/${id}`, "");
    } catch (error) {
      throw error;
    }
  };

  /**
   * @params {Post} payload -Like post    */
  static likePost = async (payload) => {
    try {
      console.log(payload, "like", `${this.urls}/likes`);
      return await ApiBase.post(`${this.urls}/likes`, payload);
    } catch (error) {
      throw error;
    }
  };

  static getMembers = async (id) => {
    try {
      return await ApiBase.get(`${this.urls}/member/profile/${id}`);
    } catch (error) {
      throw error;
    }
  };

  static getMember = async (id, userId) => {
    try {
      return await ApiBase.get(
        `${this.urls}/member/profile/${id}/${userId}`,
        ""
      );
    } catch (error) {
      throw error;
    }
  };

  /**
   * @params {Post} payload -Follow user    */
  static followMember = async (payload) => {
    try {
      return await ApiBase.post(`${this.urls}/follow`, payload);
    } catch (error) {
      throw error;
    }
  };

  /**
   * @params {Post} payload - Delete Feed
   */

  static deleteFeed = async (userId, feedId) => {
    try {
      return await ApiBase.delete(`${this.urls}/feed/${userId}/${feedId}`, "");
    } catch (error) {
      throw error;
    }
  };

  /**
   * @params {Post} payload - Delete Comment
   */

  static deleteComment = async (userId, commentId) => {
    try {
      return await ApiBase.delete(
        `${this.urls}/comment/${userId}/${commentId}`,
        ""
      );
    } catch (error) {
      throw error;
    }
  };
  /**
   * @params {Put} payload - Edit data
   */
  static editFeed = async (payload) => {
    try {
      return await ApiBase.put(`${this.urls}/feed`, payload);
    } catch (error) {
      throw error;
    }
  };
}

export default ChatApi;
