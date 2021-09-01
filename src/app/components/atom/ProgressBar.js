import React from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip'

/**
 * How to Use ProgressBar components in Other components
 * Import ProgressBar in other Components
 * Place <ProgressBar type="text|mail|others ProgressBar Type" name ="" id= "" label="" value={}  onChange={} etc/> 
 * @param {Object} props - label?, type, placeholder?, required?, id, name, onChange, className?, disabled?, value, readOnly?
 */

// type = text, email, number , 
const ProgressBar = props => {
    const { label, placeholder, required, id, name, onChange, className, disabled, readOnly, value, onBlur, error, prependIcon, helpText } = props;

    const handleChange = (event) => {
        const { name, value } = event.target;
        const { id } = event.currentTarget;
        props.onChange(name, value, id);
    }
    return (
        <>
            <div className="progressBar">
                <Form.Group controlId={id} className={className}>
                    {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
                    <InputGroup >
                        <Form.Control
                            type="number"
                            placeholder={placeholder || 0}
                            required={required}
                            name={name}
                            value={value || 0}
                            onChange={handleChange}
                            disabled={disabled}
                            readOnly={readOnly}
                            onBlur={onBlur}
                            max="100"
                            min="0"
                        />
                        <div style={{
                            marginLeft: "10px", display: "flex",
                            flexDirection: "row", paddingTop: "10px"
                        }}>
                            <div style={{
                                width: "100px", boxShadow: "0px 0px 2px rgb(0 0 0) inset", background: "#fff",
                                height: "12px", borderRadius: "20px", overflow: "hidden", marginTop: "1px"
                            }}>
                                <div style={{ width: value || 0 + "%", background: "#0bbd12", height: "100%", transition: "all ease 5s" }}></div>
                            </div>
                            <div style={{ marginLeft: "3px", fontSize: "10px" }}>{value || 0}%</div>
                        </div>
                        {
                            helpText &&
                            <InputGroup.Text id={id + "Prepend"}><Tooltip tooltipText={helpText} /></InputGroup.Text>
                        }
                    </InputGroup>
                    {error && <div className="invalid-feedback">{error}</div>}
                </Form.Group>
            </div>
        </>
    );
}




export default ProgressBar;