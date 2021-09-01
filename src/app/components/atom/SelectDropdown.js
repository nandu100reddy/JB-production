import React, { useState } from 'react'
import Select from 'react-select';
import Form from "react-bootstrap/Form";
import Tooltip from './Tooltip';
import InputGroup from 'react-bootstrap/InputGroup';


/**
 * How to Use Dropdown components in Other components
 * Import Dropdown in other Components
 * Place <Dropdown options={options}  value={value}
        onChange={onChange}  name={name} /> 
 * @param {Object} props -
 * Common props you may want to specify include:
autoFocus - focus the control when it mounts
className - apply a className to the control
classNamePrefix - apply classNames to inner elements with the given prefix
isDisabled - disable the control
isMulti - allow the user to select multiple values
isSearchable - allow the user to search for matching options
name - generate an HTML input with this name, containing the current value
onChange - subscribe to change events
options - specify the options the user can select from
placeholder - change the text displayed when no option is selected
value - control the current value
value / onChange - specify the current value of the control
menuIsOpen / onMenuOpen / onMenuClose - control whether the menu is open
inputValue / onInputChange - control the value of the search input (changing this will update the available options)
If you don't provide these props, you can set the initial value of the state they control:
defaultValue - set the initial value of the control
defaultMenuIsOpen - set the initial open value of the menu
defaultInputValue - set the initial value of the search input
*/

// onChange Function format = (e) => handleSelectChange(e, "name of Dropdown")

const SelectDropdown = props => {
  const { label, maxMenuHeight, id, helpText, value, name, customStyle, error, required, prependIcon } = props;
  const [selectedOption, setSelectedOption] = useState(value);
  const dot = (color = '#ff0') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? "#f00" : isFocused ? "#ddd" : null,
        color: isDisabled ? '#ccc' : isSelected ? "#0ff" : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? "#f00" : "#ddd"),
        },
      };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  const handleChange = (selectedOption, name, id) => {
    setSelectedOption(selectedOption);
    if (props.onChange) {
      props.onChange(name, selectedOption, id);
    }
  }
  return (
    <Form.Group controlId={id + "parent"}>
      {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
      <InputGroup>
        <div style={{ width: "100%" }}>
          <Select {...props} maxMenuHeight={maxMenuHeight || 200} className="searchSelect" value={selectedOption}
            styles={customStyle ? colourStyles : {}} onChange={(selectedOption) => handleChange(selectedOption, name, id)} />
        </div>
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
        {error && <div className="invalid-feedback">{error}</div>}

      </InputGroup>

    </Form.Group>
  )
}


export default SelectDropdown;