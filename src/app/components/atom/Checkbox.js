import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import Tooltip from "./Tooltip";

/**
 * How to Use Checkbox components in Other components
 * Import CheckBox in other Components
 * Place <Checkbox name ="" label="" checked={} value={} onChange={}/> 
 * @param {Object} props - label, name, id, checked, value etc. 
 */

const Checkbox = props => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    const { id } = event.currentTarget;
    props.onChange(name, checked, id);
  }
  return (
    <>
      <Form.Group controlId={props.id}>
        <Form.Check {...props} onChange={handleChange} />
        {
          props.helpText &&
          <Tooltip tooltipText={props.helpText} />
        }
      </Form.Group>
    </>
  );
}

/**
 * Validate Types of Props
 */
Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}


export default Checkbox;