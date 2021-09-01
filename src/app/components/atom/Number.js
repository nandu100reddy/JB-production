import React from 'react';
import { Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip';
/**
 * How to Use Number components in Other components
 * Import Number in other Components
 * Place <Number /> 
 * @param {*} props 
 * For Reference: https://www.npmjs.com/package/react-number-format
 */

const Number = props => {
  const { required, label, error, id, helpText, prependIcon, name } = props;
  const handleChange = (values, name, id) => {
    const { formattedValue, value } = values;
    props.onChange(name, formattedValue, id);
  }
  return (
    <>
      <Form.Group>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <NumberFormat
            className="numberFormat"
            {...props}
            onChange={() => { }}
            onValueChange={(values) => handleChange(values, name, id)}
            className="form-control"
          />
          {
            helpText &&
            <InputGroup.Text id={id + "Prepend"}><Tooltip tooltipText={helpText} /></InputGroup.Text>
          }
          {prependIcon &&
            <InputGroup.Prepend>
              <InputGroup.Text id={id + "Prepend"}>{prependIcon}</InputGroup.Text>
            </InputGroup.Prepend>
          }
        </InputGroup>
        {error && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </>
  )
}

export default Number;



/**
 * onValueChange={(values) => {
    const {formattedValue, value} = values;
    // formattedValue = $2,223
    // value ie, 2223
    this.setState({profit: formattedValue})
  }}
 */