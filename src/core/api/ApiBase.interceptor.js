import Axios from 'axios';
import * as actionTypes from "../actions/ActionTypes";

const interceptor = (store) => {
  Axios.interceptors.request.use(
    (conf) => {
      let loggedUserDetail = store.getState().users.loginUserData;
      if (loggedUserDetail && loggedUserDetail.user) {
        conf.headers.Authorization = loggedUserDetail.token;
        conf.headers.domain = loggedUserDetail.user.username;
        if (conf.data && conf.data.master)
          conf.headers.master = conf.data && conf.data.master;
      }
      store.dispatch({
        type: actionTypes.SHOW_LOADER,
        showLoader: true
      });
      return conf;
    },
    (error) => {
      store.dispatch({
        type: actionTypes.SHOW_LOADER,
        showLoader: false
      });
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    (next) => {
      store.dispatch({
        type: actionTypes.SHOW_LOADER,
        showLoader: false
      })
      return Promise.resolve(next);
    },
    (error) => {
      store.dispatch({
        type: actionTypes.SHOW_LOADER,
        showLoader: false
      })
      store.dispatch({
        type: actionTypes.OPEN_WARNING_MODAL,
        message: error.message
      });
      return Promise.reject(error);
    }
  );
};

export default {
  interceptor,
}