import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import { fieldTypeOptions } from "./constants";
import { createField, updateField } from "../../../../../core/actions/Fields.action";
import Input from '../../../../components/atom/Input';
import CustomButton from '../../../../components/atom/Button';
import Checkbox from '../../../../components/atom/Checkbox';
import SelectDropdown from '../../../../components/atom/SelectDropdown';
import Textarea from '../../../../components/atom/Textarea'

const Create = (props) => {
    const { activeApplication, match: { params: { objectId, id } } } = props;
    const [fields, setFields] = useState({});

    const handleSelectChange = (name, value, id) => {
        setFields({
            ...fields,
            [name]: value,
            type: value.value
        })
    }
    const handleChange = (name, value, id) => {
        setFields({
            ...fields,
            [name]: value
        })
    }
    const handleBlur = () => {
    }
    const handleSave = () => {
        const { unique, required } = fields;
        const fieldPayload = {
            ...fields,
            object_id: objectId,
            attributes: {
                unique,
                required
            }
        }
        // Call field create Action 
        props.createField(fieldPayload)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Object Created successfully and redirect on Object List Page
                    if (data.statusCode === 1) {
                        alert("Field name Created Successfully!".replace("name", result.name));
                        props.history.push(`/setup/${objectId}/fields`);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }
    const handleUpdate = () => {
        const { unique, required } = fields;
        const fieldPayload = {
            ...fields,
            object_id: objectId,
            attributes: {
                unique,
                required
            }
        }
        // Call field update Action 
        props.updateField(id, fieldPayload)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Object Created successfully and redirect on Object List Page
                    if (data.statusCode === 1) {
                        alert("Field name Updated Successfully!".replace("name", result.name));
                        props.history.push(`/setup/${objectId}/fields`);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }



    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">
                        {id ? "Edit Field" : "Create New Field"}
                    </span>
                    <span style={{ display: "flex" }}>{id ? "Edit" : "Create"} the Field items</span>
                </Col>
                <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" >
                    {id ? <CustomButton id="updateField" type="submit" onClick={handleUpdate}
                        variant="dark" text="Save" className="mr-2"
                    /> :
                        <CustomButton variant="dark" text="Save" type="submit" className="mr-2" id="createFieldSave"
                            onClick={handleSave} />
                    }
                    <CustomButton variant="dark" text="Cancel" type="submit" id="createFieldCancel"
                        onClick={() => props.history.push(`/setup/${objectId}/fields`)}
                    />
                </Col>
            </Row>

            <Row xs={1} className="table_div_margin_objectList border_createEditscreen">
                <Col className="heading_object_screens heading_eachline pl-3">Select Field Type</Col>
                <Col className="pl-3 pt-3">
                    <Row>
                        <Col className="heading_eachline" sm={2}>Field Type</Col>
                        <Col sm={5}>
                            <SelectDropdown
                                options={fieldTypeOptions}
                                maxMenuHeight={200}
                                value={fields.fieldType}
                                onChange={(e) => handleSelectChange(e, "fieldType")}
                                className="searchSelect"
                                name="fieldType"
                                id="fieldType" />
                        </Col>
                    </Row>
                </Col>
                <Col className="heading_object_screens heading_eachline pl-3">Basic Field Information</Col>
                <Col>
                    <Row xs={1}>
                        <Col className="col-lg-6">
                            <Input type="text" id="name" label="Field Name" name="name" value={fields.name}
                                onChange={handleChange} placeholder="Application Name" onBlur={handleBlur} required={true}
                            />
                        </Col>
                        <Col className="col-lg-6">
                            <Input type="text" id="label" label="Field Display Name" name="label" value={fields.label}
                                onChange={handleChange} placeholder="Application Name" onBlur={handleBlur} required={true}
                            />
                        </Col>
                        <Col>
                            <Textarea label="Description" name="description" rows={2}
                                value={fields.description}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Textarea
                                label="Help Text"
                                name="tool_tip_info"
                                rows={2}
                                value={fields.tool_tip_info}
                                onChange={handleChange}
                            />
                            <span style={{ color: 'grey' }}>Enter the 'Quick info' that will appear when a use Creates or edits the record</span>
                        </Col>
                        <Col className="ckecks_fieldCreate mb-4 mt-4">
                            <span className="heading_eachline mr-5">Required</span>
                            <Checkbox label="Always require a value in this field in order to save a record"
                                name="required"
                                id="required"
                                checked={fields.required}
                                value={fields.required}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col className="ckecks_fieldCreate mb-4">
                            <span className="heading_eachline mr-5">Unique</span>
                            <Checkbox label="Do not allow duplicate value"
                                name="unique"
                                id="unique"
                                checked={fields.unique}
                                value={fields.unique}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className="newCustomfield_ViewObject">
                    <CustomButton variant="dark" text="Save" type="submit" className="mr-2" onClick={handleSave} />
                    <CustomButton variant="dark" text="Cancel" type="button" onClick={() => props.history.push(`/setup/field/create`)} />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        fieldDetails: state.fields.field
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        createField,
        updateField,
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Create));