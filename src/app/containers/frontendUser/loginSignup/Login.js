import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginDetails } from '../../../../core/actions/User.actions';
import { setUserDetailsInStore } from '../../../../core/actions/User.actions';
import schema from './common/LoginValidateSchema';
import { Row, Col } from 'react-bootstrap';
import Input from '../../../components/atom/Input';
import Checkbox from "../../../components/atom/Checkbox";
import CustomButton from "../../../components/atom/Button";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = props => {
  //All State Define here 
  const [userDetails, setUserDetails] = useState({
    user: {
      username: '',
      password: '',
    },
    showPassword: false,
    usernameError: null,
    passwordError: null,
    apiMessage: null
  })

  /**
   * handleChange - function use for handle/set form input field value to component state({Object} - userDetails)
   * @params {Object} event 
   */
  const handleChange = (name, value, id) => {
    const { user } = userDetails;
    user[name] = value;
    setUserDetails({
      ...userDetails,
      user: user,
      apiMessage: null
    });
  }
  /**
    * handleBlur - function use for check validation of form field on Blur events.
    * @params {Object} event 
    */
  const handleBlur = event => {
    const { name } = event.target;
    const { user } = userDetails;
    const errorLabel = name + "Error"
    const result = schema.validate(user, { abortEarly: false });
    setUserDetails({
      ...userDetails,
      [errorLabel]: null
    });
    if (result.error) {
      result.error.details.map(errorItem => {
        switch (errorItem.context.label) {
          case name: {
            setUserDetails({
              ...userDetails,
              [errorLabel]: errorItem.message,
            });
            break;
          }
          default:
        }
      })
    } else {
      setUserDetails({
        ...userDetails
      });
    }
  }


  /**
   * handleSubmit - function handle user login Details
   * @params {Object} event - User entered email field value 
   */


  const handleSubmit = (event) => {
    event.preventDefault();
    const { user } = userDetails;
    // Call Login Action 
    props.loginDetails(user).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;
        setUserDetails({
          ...userDetails,
          apiMessage: result.message
        })
        // check login success and setUser details on localStorage
        if (data.statusCode === 1) {
          // Set User Details in Redux Store
          props.setUserDetailsInStore(result);
          const userDetails = JSON.stringify(result);
          // set the state of the user in Routes components
          props.setUser(userDetails)
          // store the user Details in localStorage
          localStorage.setItem('user', userDetails)
          // Redirect on home page after SuccessFull Login
          props.history.push('/');
        }
      } else {
        console.log(response.status)
      }
    });
  }

  /**
  *   handleShowHidePassword - function handle password show and hide
  *   
  */
  const handleShowHidePassword = () => {
    setUserDetails({
      ...userDetails,
      showPassword: !userDetails.showPassword
    });
  }
  /**
    *   handleRememberMe - function handle RememberMe checked and unchecked
    *   
    */

  const handleRememberMe = () => {

  }

  // Extract variables and properties from props and useState state object here 
  const { username, password, usernameError, passwordError, showPassword, apiMessage } = userDetails;
  return (
    <div className="loginPage" >
      <Row>
        <Col sm="6">
          <div className="img-holder"></div>
        </Col>
        <Col sm="6">
          <div className="holder">
            <div className="holder-inner">
              <div className="logo mb-2">
                <a href="#" target="_blank">
                  <img
                    alt="JanBask"
                    src="http://jbwork.in/jbplatform-images/images/JBPlatformlogoFinal.png"
                  />
                </a>
              </div>

              <form name="form">
                <Input
                  type="text"
                  id="userName"
                  label="Email address or Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Email address or Username"
                  onBlur={handleBlur}
                  error={usernameError}
                  className={usernameError && "is-invalid"}
                  required={true}
                />
                <Input
                  id="password"
                  type={userDetails.showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={passwordError}
                  className={passwordError && "is-invalid"}
                  prependIcon={!showPassword ? <FaEyeSlash onClick={handleShowHidePassword} /> : <FaEye onClick={handleShowHidePassword} />}
                  required={true} />
                {apiMessage && <div className="afterLoginMsg">{apiMessage}</div>}
                <div className="requiredInstruction">* Required field</div>

                <CustomButton
                  variant="primary"
                  id="login"
                  type="submit"
                  onClick={handleSubmit}
                  text="Login"
                  className="btn-block"
                />
                <Checkbox name="rememberMe" id="rememberMe" label="Remember Me" onChange={handleRememberMe} />
              </form>
              <div align="center">
                <NavLink
                  to="/forgetPassword" className="relatedFormLinks">
                  Forgot your Password?
                </NavLink>
              </div>
              <hr></hr>
              <div className="SignupBtnOnLogin" align="center">
                Not a Customer?{' '}
                <NavLink to="/signup" variant="outlined" className="btn-dark" >
                  Signup for Free
                </NavLink>
              </div>

            </div>
          </div>
        </Col>
      </Row>
    </div >
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedUserDetails: state.users.userData
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    loginDetails,
    setUserDetailsInStore
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Login));

