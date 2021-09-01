import React from 'react';
import { Form } from 'react-bootstrap';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip';
import 'react-phone-number-input/style.css'
/**
 * How to Use Number components in Other components
 * Import Number in other Components
 * Place <Number /> 
 * @param {*} props 
 * For Reference: https://www.npmjs.com/package/react-number-format
 */

const PhoneNumber = props => {
  const { required, label, error, id, helpText } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    const { id } = event.currentTarget;
    props.onChange(name, value, id);
  }
  return (
    <>
      <Form.Group>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <PhoneInput {...props} onChange={handleChange} />
          {
            helpText &&
            <InputGroup.Text id={id + "Prepend"}><Tooltip tooltipText={helpText} /></InputGroup.Text>
          }
        </InputGroup>
        {error && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </>
  )
}

export default PhoneNumber;



/**
 * onValueChange={(values) => {
    const {formattedValue, value} = values;
    // formattedValue = $2,223
    // value ie, 2223
    this.setState({profit: formattedValue})
  }}
 */