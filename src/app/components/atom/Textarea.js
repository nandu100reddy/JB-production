import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

/**
 * How to Use Textarea components in Other components
 * Import Textarea in other Components
 * Place <Textarea rows={number} name ="" id= "" label="" value={string}  onChange={function} etc/> 
 * @param {Object} props - label?, required?, id, name, onChange, className?, disabled?, value, readOnly?
 */
const Textarea = props => {
  const { label, type, required, id, name, className, disabled, readOnly, value, onBlur, error, prependIcon, rows } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    const { id } = event.currentTarget;
    props.onChange(name, value, id);
  }
  return (
    <>
      <Form.Group controlId={id} className={"root_" + className}>
        <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={rows ? type === "textareaRich" ? rows + 2 : rows : 3}
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            onBlur={onBlur}
          />
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
Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Textarea;