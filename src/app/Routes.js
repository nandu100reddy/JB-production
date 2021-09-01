import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadLoader } from '../core/actions/Loader.action';
import { setUserDetailsInStore } from '../core/actions/User.actions';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/common/notFound/NotFound';
import Login from './containers/frontendUser/loginSignup/Login';
import Signup from './containers/frontendUser/loginSignup/Signup';
import ForgetPassword from './containers/frontendUser/forgetPassword/ForgetPassword';
import FrontendUser from "./containers/frontendUser/FrontendUser";


// All Setup Container file Import here

import Setup from './containers/setup/Setup';

const Routes = props => {
  const [user, setUser] = useState(null);

  //Check if a user has previously logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      props.setUserDetailsInStore(foundUser);
      setUser(foundUser.user);
    }
    props.loadLoader(false);
  }, []);

  return (
    <Switch>
      <>
        {
          user === null || user === undefined ?
            <>
              <Route exact path="/" render={(props) => (<Login {...props} setUser={setUser} />)} />
              <Route exact path="/login" render={(props) => (<Login {...props} setUser={setUser} />)} />
              <Route exact path="/signup" render={(props) => (<Signup {...props} setUser={setUser} />)} />
              <Route exact path="/forgetPassword" render={(props) => (<ForgetPassword {...props} setUser={setUser} />)} />
            </> :
            <>
              
              <Route path="/Setup" component={Setup} />
              <Route path="/user" component={FrontendUser} />
              <Route exact path="/">
                {<Redirect to="/user" />}
              </Route>
              <Route path="/404" component={NotFound} />
            </>
        }

      </>
    </Switch >
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    showLoader: state.loader.showLoader
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    loadLoader,
    setUserDetailsInStore
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Routes));

