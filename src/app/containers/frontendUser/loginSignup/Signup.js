import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpDetails } from '../../../../core/actions/User.actions';
import { setUserDetailsInStore } from '../../../../core/actions/User.actions';
import schema from './common/SignupValidateSchema';
import { Row, Col } from 'react-bootstrap';
import Input from '../../../components/atom/Input';
import CustomButton from "../../../components/atom/Button";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = props => {

  //All State Define here 
  const [userDetails, setUserDetails] = useState({
    user: {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      confirm_password: '',
      phone_number: '',
      email_address: ''
    },
    error: {
      first_name_error: null,
      last_name_error: null,
      username_error: null,
      password_error: null,
      confirm_password_error: null,
      phone_number_error: null,
      email_address_error: null
    },
    isValidate: false,
    show_confirm_password: false,
    show_Password: false,
    apiMessage: null
  })

  // extract key from state object 
  const { user: { first_name, last_name, username, password, confirm_password, email_address, phone_number },
    error: { first_name_error, last_name_error, username_error, password_error, confirm_password_error,
      email_address_error, phone_number_error },
    show_confirm_password, show_Password, isValidate, apiMessage
  } = userDetails;

  /**
   * handleChange - function use for handle/set form input field value to component state({Object} - userDetails)
   * @params {Object} event 
   */
  const handleChange = (name, value, id) => {
    const { user } = userDetails;
    setUserDetails({
      ...userDetails,
      user: {
        ...user,
        [name]: value
      }
    });
  }
  /**
    * handleBlur - function use for check validation of form field on Blur events.
    * @params {Object} event 
    */
  const handleBlur = event => {
    const { name } = event.target;
    const { user, error } = userDetails;
    const errorLabel = name + "_error"
    const result = schema.validate(user, { abortEarly: false });
    setUserDetails({
      ...userDetails,
      error: {
        ...error,
        [errorLabel]: null
      }
    });
    if (result.error) {
      result.error.details.map(errorItem => {
        switch (errorItem.context.label) {
          case name: {
            setUserDetails({
              ...userDetails,
              error: {
                ...error,
                [errorLabel]: errorItem.message,
              },
              isValidate: false
            });
            break;
          }
          default:
        }
      })
    } else {
      setUserDetails({
        ...userDetails,
        isValidate: true
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
    user["domain"] = user.username;
    user["company"] = user.username;
    // Call Login Action 
    props.signUpDetails(user).then(response => {
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
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        alert("Status: " + response.status + "Error: " + response.data.result.message);
      }
    });
  }

  /**
 *   handleShowHidePassword - function handle password show and hide
 *   @params {string} : passwordName - like show_confirm_password/show_Password
 */
  const handleShowHidePassword = (passwordName) => {
    setUserDetails({
      ...userDetails,
      [passwordName]: !userDetails[passwordName]
    });
  }

  return (
    <div className="register-page">
      <Row>
        <Col sm="6">
          <div className="img-holder"></div>
        </Col>
        <Col sm="6">
          <div className="holder">
            {' '}
            <div className="holder-inner">
              <div className="logo">
                <a href="#" target="_blank">
                  <img
                    alt="Locqum"
                    src="http://jbwork.in/jbplatform-images/images/JBPlatformlogoFinal.png"
                  />
                </a>
              </div>
              <h1 className="loginHead">
                <span>Signup Now Get started with your free trial</span>{' '}
              </h1>
              <form name="form">
                <Input
                  type="text"
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  onBlur={handleBlur}
                  error={first_name_error}
                  className={first_name_error && "is-invalid"}
                  required={true}
                />
                <Input
                  type="text"
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  onBlur={handleBlur}
                  error={last_name_error}
                  className={last_name_error && "is-invalid"}
                  required={true}
                />
                <Input
                  type="text"
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="User Name"
                  onBlur={handleBlur}
                  error={username_error}
                  className={username_error && "is-invalid"}
                  required={true}
                />
                <Input
                  type="text"
                  id="email_address"
                  label="Email address"
                  name="email_address"
                  value={email_address}
                  onChange={handleChange}
                  placeholder="Email Address"
                  onBlur={handleBlur}
                  error={email_address_error}
                  className={email_address_error && "is-invalid"}
                  required={true}
                />
                <Input
                  type="text"
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  value={phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  onBlur={handleBlur}
                  error={phone_number_error}
                  className={phone_number_error && "is-invalid"}
                  required={true}
                />
                <Input
                  id="password"
                  type={userDetails.show_Password ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={password_error}
                  className={password_error && "is-invalid"}
                  required={true}
                  prependIcon={!show_Password ?
                    <FaEyeSlash onClick={() => handleShowHidePassword("show_Password")} /> :
                    <FaEye onClick={() => handleShowHidePassword("show_Password")} />} />
                <Input
                  id="password"
                  type={userDetails.show_confirm_password ? 'text' : 'password'}
                  label="Confirm Password"
                  name="confirm_password"
                  value={confirm_password}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={confirm_password_error}
                  className={confirm_password_error && "is-invalid"}
                  required={true}
                  prependIcon={!show_confirm_password ?
                    <FaEyeSlash onClick={() => handleShowHidePassword("show_confirm_password")} /> :
                    <FaEye onClick={() => handleShowHidePassword("show_confirm_password")} />} />
                {apiMessage && <div className="afterLoginMsg">{apiMessage}</div>}
                <div className="requiredInstruction">* Required field</div>
                <CustomButton
                  variant="primary"
                  id="signup"
                  type="submit"
                  onClick={handleSubmit}
                  text="Sign Up"
                  disabled={!isValidate}
                  className="btn-block"
                />
              </form>
              <hr></hr>
              <div className="alreadySignupInfo">
                <div className="SignupBtnOnLogin" align="center">
                  Already Joined?
                      <NavLink to="/login" variant="outlined" className="btn-dark">
                    Login Now
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>
  );

}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedUserDetails: state.users.loginUserData
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signUpDetails,
    setUserDetailsInStore
  },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
