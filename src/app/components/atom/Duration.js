import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip'

/**
 * How to Use Durations components in Other components
 * Import Durations in other Components
 * Place <Durations type="text|mail|others Durations Type" name ="" id= "" label="" value={}  onChange={} etc/> 
 * @param {Object} props - label?, type, placeholder?, required?, id, name, onChange, className?, disabled?, value, readOnly?
 */

// type = text, email, number , 
const Durations = props => {
  const { label, type, placeholder, required, id, name, className, disabled, readOnly, value, error, prependIcon, helpText } = props;
  const [validateError, setValidateError] = useState(false)
  const onBlur = (event) => {
    const { name, value } = event.target;

  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    const { id } = event.currentTarget;
    // props.onChange(name, value, id);
    alert(value)
  }
  return (
    <>
      <Form.Group controlId={id} className={className}>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={placeholder || "1y 1mm 1w 1d 1h 1m"}
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            onBlur={onBlur}
          />
          {
            helpText &&
            <InputGroup.Text id={id + "Prepend"}><Tooltip tooltipText={helpText} /></InputGroup.Text>
          }
          {
            prependIcon &&
            <InputGroup.Prepend>
              <InputGroup.Text id={id + "Prepend"}>{prependIcon}</InputGroup.Text>
            </InputGroup.Prepend>
          }
        </InputGroup>

        {error && <div className="invalid-feedback">{error}</div>}
        {validateError && <div className="invalid-feedback">Your {label} must be in the format {placeholder || "1y 1mm 1w 1d 1h 1m"}. </div>}
      </Form.Group>
    </>
  );
}



/**
 * Validate Types of Props
 */
Durations.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Durations;