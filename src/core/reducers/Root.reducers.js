import { connectRouter } from "connected-react-router";
import history from "../store/History";
import { combineReducers } from "redux";
import users from './Users.reducer';
import loader from './Loader.reducer';
import records from './Records.reducer';
import objects from './Objects.reducer';
import fields from './Fields.reducer';
import application from './Applications.reducer';
import layouts from './Layouts.reducer';
import common from './Common.reducer';


const rootReducer = combineReducers({
  users,
  records,
  objects,
  fields,
  loader,
  application,
  layouts,
  common,
  router: connectRouter(history)
});

export default rootReducer;