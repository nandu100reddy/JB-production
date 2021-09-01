import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip'

/**
 * How to Use Input components in Other components
 * Import Input in other Components
 * Place <Input type="text|mail|others Input Type" name ="" id= "" label="" value={}  onChange={} etc/> 
 * @param {Object} props - label?, type, placeholder?, required?, id, name, onChange, className?, disabled?, value, readOnly?
 */

// type = text, email, number , 
const Input = props => {
  const { label, type, placeholder, required, id, name, className, disabled, readOnly, value, onBlur, error, prependIcon, helpText } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    const { id } = event.currentTarget;
    props.onChange(name, value, id);
  }
  return (
    <>
      <Form.Group controlId={id} className={className}>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <Form.Control
            type={type}
            placeholder={placeholder ? placeholder : ''}
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
      </Form.Group>
    </>
  );
}



/**
 * Validate Types of Props
 */
Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input;