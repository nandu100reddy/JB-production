import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip';
import DatePicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";

/**
 * How to Use CustomDatePicker components in Other components
 * Import CustomDatePicker in other Components
 * Place  <DatePicker
 *  selected={startDate} - start Date/ Current Date or new Date()
 *  onSelect={onSelect}  - when day is clicked
 *  onChange={date => onChange(date)} only when value has changed />
 * @param {Object} props - ex: startDate, onSelect, onChange
 * onChange={(date) => setStartDate(date)}
 */

const DatePickers = props => {
  const { label, required, id, value, className, name, error, prependIcon, helpText } = props;

  const [selectedDate, setSelectedDate] = useState(null)
  const handleChange = (date, name, id) => {
    props.onChange(name, date, id);
    setSelectedDate(date)
  }
  return (
    <>
      <Form.Group controlId={id} className={className}>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <DatePicker className="form-control"
            selected={value && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value) ? new Date(value.split("T")[0]) : value}
            onChange={(date) => handleChange(date, name, id)} />
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



export default DatePickers;