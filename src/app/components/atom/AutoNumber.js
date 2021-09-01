import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import InputGroup from 'react-bootstrap/InputGroup';

const AutoNumber = props => {
  const { name, value, label, prefix, totalDigitLength, helpText, className, id } = props;
  const generateAutoNumber = () => {
    let length = value.toString().length;
    let addZeroCount = totalDigitLength - length;
    if (addZeroCount > 0) {
      let ZeroString = ""
      for (let i = 0; i < addZeroCount; i++) {
        ZeroString += "0";
      }
      return `${prefix}-${ZeroString}${value}`;
    }
    return `${prefix}-${value}`;
  }
  return (
    <>
      <Form.Group controlId={id} className={className || ""}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          name={name}
          value={generateAutoNumber()}
          disabled="true"
        />
        {
          helpText &&
          <InputGroup.Text><Tooltip tooltipText={helpText} /></InputGroup.Text>
        }
      </Form.Group>
    </>
  )
}

AutoNumber.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
}

export default AutoNumber;