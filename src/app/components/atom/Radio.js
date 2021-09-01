import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";
import Tooltip from "./Tooltip";

/**
 * How to Use Radio components in Other components
 * Import CheckBox in other Components
 * Place <Radio  type" " name ="" label="" checked={} value={} onChange={}/> 
 * @param {Object} props - label, name, id, checked, value etc. 
 */

const Radio = props => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    const { id } = event.currentTarget;
    props.onChange(name, checked, id);
  }
  return (
    <>
      <Form.Group controlId={props.id} className="pt-3 mt-3 mb-2">
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
Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}


export default Radio;