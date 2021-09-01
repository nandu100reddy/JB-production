
import React from "react";
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * How to Use Input components in Other components
 * Import Input in other Components
 * Place <Button variant="primary|secondary..." id= "" type="button|Submit" onClick={} etc> text</Button>
 * @param {Object} props - type, id, className, disabled, onClick, variant, text
 */
const CustomButton = props => {
  const { type, id, className, disabled, onClick, variant, text } = props;
  return (
    <>
      <Form.Group id={id} >
        <Button variant={variant} type={type} onClick={onClick} disabled={disabled} className={className}>
          {text}
        </Button>
      </Form.Group>
    </>
  );
}


/**
 * Validate Types of Props
 */
CustomButton.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default CustomButton;

