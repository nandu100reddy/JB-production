import * as types from "./ActionTypes";
import ChatApi from "../api/Chat.api";

/**
 * ACTION CHATTER
 */

/**
 * @param {Array} posts - Chat related all List information
 */

export const getPostsSuccess = (posts) => {
  return {
    type: types.POST_GET_REQUEST,
    posts,
  };
};

/**
 * @param {Array} posts - post related all List information
 */

export const getPostByIdSuccess = (post) => {
  return {
    type: types.POST_GET_REQUEST_BY_ID,
    post,
  };
};

export const createPostSuccess = (createPostData) => {
  return {
    type: types.POST_CREATE_REQUEST,
    createPostData,
  };
};

export const deletePostSuccess = (post, payload) => {
  return {
    type: types.POST_DELETE_REQUEST_BY_ID,
    post,
    payload,
  };
};

/**
 * ACTION DISPATCHERS
 */

/**
 * Load all Post list details and  Dispatch Action
 */

export const getPosts = (id) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.getPosts(id);
      // dispatch(getPostsSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Create Posr and Dispatch Action
 * @params {Post} payload
 */

export const createPost = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.createPost(payload);
      //   dispatch(createPostSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Create Posr and Dispatch Action
 * @params {Post} payload
 */

export const createComment = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.createComment(payload);
      //   dispatch(createPostSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const likePost = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.likePost(payload);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Load all Members list details and  Dispatch Action
 */

export const getMembers = (id) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.getMembers(id);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Load single Member details and  Dispatch Action
 */

export const getMember = (id, userId) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.getMember(id, userId);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Follow member and  Dispatch Action
 */

export const followMember = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.followMember(payload);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 *Delete Feed and  Dispatch Action
 */

export const deleteFeed = (userId, feedId) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.deleteFeed(userId, feedId);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 *Delete Comment and  Dispatch Action
 */

export const deleteComment = (userId, commentId) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.deleteComment(userId, commentId);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Edit Posr and Dispatch Action
 * @params {Post} payload
 */

export const editFeed = (payload) => {
  return async (dispatch) => {
    try {
      const data = await ChatApi.editFeed(payload);
      //   dispatch(createPostSuccess(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
};
