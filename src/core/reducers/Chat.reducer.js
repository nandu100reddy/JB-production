import * as actionTypes from "../actions/ActionTypes";
import initialState from "./initialState";

const posts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_GET_REQUEST:
      return {
        ...state,
        posts: action.posts,
      };
    case actionTypes.POST_GET_REQUEST_BY_ID:
      return {
        ...state,
        post: action.post,
      };
    case actionTypes.post_CREATE_REQUEST:
      return {
        ...state,
        createPostData: action.createPostData,
      };
    case actionTypes.POST_DELETE_REQUEST_BY_ID:
      return {
        ...state,
        posts: state.posts.data.result.filter((i) => i._id !== action.payload),
      };

    default:
      return {
        ...state,
      };
  }
};

export default posts;
