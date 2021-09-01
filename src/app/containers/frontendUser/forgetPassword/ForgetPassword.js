
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forgetPasswordDetails } from '../../../../core/actions/User.actions'
import { Row, Col } from 'react-bootstrap';
import Input from '../../../components/atom/Input';
import CustomButton from "../../../components/atom/Button";

const ForgetPassword = props => {
  //All State Define here 
  const [userDetails, setUserDetails] = useState({
    user: { email_address: '' },
    apiMessages: null,
    email_addressError: null,
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
      ...user,
      apiMessage: null
    });
  }
  /**
    * handleBlur - function use for check validation of form field on Blur events.
    * @params {Object} event 
    */
  const handleBlur = event => {
  }


  /**
   * handleSubmit - function handle user login Details
   * @params {Object} event - User entered email field value 
   */


  const handleSubmit = (event) => {
    event.preventDefault();
    const { user } = userDetails;
    // Call Login Action 
    props.forgetPasswordDetails(user).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;
        setUserDetails({
          ...userDetails,
          apiMessage: result.message
        })
        // check forget password  success and redirect on Login page
        if (data.statusCode === 1) {
          alert("Success Message: " + result.message);
          props.history.push('/login');
        }
      } else {
        console.log(response.status)
      }
    });
  }


  // Extract variables and properties from props and useState state object here 
  const { email_address, email_addressError, apiMessage } = userDetails;
  return (
    <div className="loginPage" >
      <Row>
        <Col sm="6">
          <div className="img-holder"></div>
        </Col>
        <Col sm="6">
          <div className="holder">
            <div className="holder-inner">
              <div className="mb-2">
                <a href="#" target="_blank">
                  <img
                    alt="JanBask"
                    src="http://jbwork.in/jbplatform-images/images/JBPlatformlogoFinal.png"
                  />
                </a>
              </div>
              <h1 className="loginHead">
                <b>Forgot Your Password</b>{' '}
              </h1>
              <div className="mb-4">
                <p>Having trouble logging in?</p>
                <p>To reset your password, enter your JanBask email address</p>
              </div>

              <form name="form">
                <Input
                  type="text"
                  id="email_address"
                  label="Email address"
                  name="email_address"
                  value={email_address}
                  onChange={handleChange}
                  placeholder="Enter Email address"
                  onBlur={handleBlur}
                  error={email_addressError}
                  className={email_addressError && "is-invalid"}
                  required={true}
                />
                {apiMessage && <div className="afterLoginMsg">{apiMessage}</div>}
                <div className="requiredInstruction">* Required field</div>

                <CustomButton
                  variant="primary"
                  id="forgetPassword"
                  type="submit"
                  onClick={handleSubmit}
                  text="Continue"
                  className="btn-block"
                />
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </div >
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    forgetPasswordDetails
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(ForgetPassword));
