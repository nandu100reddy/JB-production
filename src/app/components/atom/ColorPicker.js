import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip';

/**
 * How to Use ColorPicker components in Other components
 * Import ColorPicker in other Components
 * Place <ColorPicker type="text|mail|others ColorPicker Type" name ="" id= "" label="" value={}  onChange={} etc/> 
 * @param {Object} props - label?, type, placeholder?, required?, id, name, onChange, className?, disabled?, value, readOnly?
 */

const ColorPicker = props => {
    const { label, required, id, className, error, prependIcon, value, helpText, onBlur, placeholder } = props;
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
                    <input type="color" onChange={handleChange} value={value || "#ff00ff"} onBlur={onBlur} placeholder={placeholder || "#XXXXXX"} />
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


export default ColorPicker;