import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFieldsByObjectId } from '../../../../../core/actions/Objects.action';
import { createRecord, updateRecord, getRecordById } from '../../../../../core/actions/Records.action'
import CustomButton from '../../../../components/atom/Button';
import CreateForm from '../../../../components/molecules/CreateForm';


const Create = props => {
    const { activeApplication, currentObject, match: { params: { id } } } = props;
    const [record, setRecord] = useState({});
    const [createRecordDetails, setCreateRecordDetails] = useState({
        application_id: activeApplication._id,
        object_id: currentObject._id,
        master: 1,
        data: []
    })
    const [recordFields, setRecordFields] = useState([])

    useEffect(async () => {
        await getFieldsByObjectId();
        if (id) {
            await getRecordByRecordID(id);
        }
    }, [])

    /**
     * getFieldsByObjectId -  get Form Field JSON Object as per current selected application object ID
     */
    const getFieldsByObjectId = () => {
        props.getFieldsByObjectId(currentObject._id, activeApplication._id)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    if (data.statusCode === 1) {
                        //setRecordFields(result.fieldsWithPageLayout);
                        setRecordFields(result.fields.fieldsWithPageLayout);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }

    const getRecordByRecordID = (id) => {
        props.getRecordById(id, currentObject._id, activeApplication._id).then(response => {
            if (response && response.status === 200) {
                const { data, data: { result } } = response;
                if (data.statusCode === 1) {
                    const recordNew = {};
                    setCreateRecordDetails({
                        ...createRecordDetails,
                        data: result.objectData.data
                    })
                    result.objectData.data.map(data => {
                        recordNew[data.field_id] = data.data
                    })
                    setRecord(recordNew);
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }

    /**
     * onHandleChange - function use for handle/set form input field value to component state({Object} - userDetails)
     * @params {Object} event 
     */
    const onHandleChange = (name, value, id) => {
        let { data } = createRecordDetails;
        const obj = {
            field_id: id,
            data: value
        }
        data = data.filter(item => item.field_id != id);
        data.push(obj);
        setCreateRecordDetails({
            ...createRecordDetails,
            data
        });
        setRecord({
            ...record,
            [name]: value
        })
    }

    const handleBlur = () => {

    }
    /**
       * Function for create record data
       * @param {object} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // Call record Action 
        props.createRecord(createRecordDetails)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Record Created success and redirect on Record List Page
                    if (data.statusCode === 1) {
                        alert("Record recordName Created Successfully!".replace("recordName", result._id));
                        props.history.push(`/user/${activeApplication._id}/${currentObject._id}/`)
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }
    /**
      * Function for Update record data
      * @param {object} event 
    */
    const handleUpdate = (event) => {
        event.preventDefault();
        // Call Record Action 
        props.updateRecord(id, createRecordDetails)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Record Updated success and redirect on Setup Page
                    if (data.statusCode === 1) {
                        alert("Record recordName Updated Successfully!".replace("recordName", result._id));
                        props.history.push(`/user/${activeApplication._id}/${currentObject._id}/`);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }

    const renderFormWithJson = () => {
        return recordFields && recordFields.map(fieldLayout => <Container>
            <Row style={{ border: "2px solid #e6e6e6" }} className="mt-3">
                <Col xs={12} style={{ border: "2px solid #e6e6e6", backgroundColor: "#f7f7f7", fontWeight: "bold" }} className="p-2">
                    {fieldLayout.section}
                </Col>
                {
                    fieldLayout.fields.map(fieldSection => <Col sm={6} className="pt-2 pb-2">
                        <Row>
                            {
                                fieldSection.map(fieldOuter => {
                                    const { field } = fieldOuter;
                                    if (fieldOuter.key === 'blank_space') {
                                        return <Col sm={12} className="pt-3 pb-5 mb-2"></Col>
                                    }
                                    if (field) {
                                        var optionsNew = field.attributes?.defaultItems?.map(item => {
                                            item.label = item.key;
                                            return item;
                                        });

                                        return <Col sm={12} className="mb-2" key={field._id}>
                                            <CreateForm
                                                type={field.type}
                                                id={field._id}
                                                label={field.label}
                                                name={field._id}
                                                value={record[field._id]}
                                                onChange={onHandleChange}
                                                placeholder={field.name}
                                                onBlur={handleBlur}
                                                rows={field.rows}
                                                options={optionsNew}
                                                checked={record[field.name]}
                                                attributes={field.attributes}
                                                lookupIDsObject={{
                                                    activeApplicationId: activeApplication._id,
                                                    ObjectId: field.attributes && field.attributes.relationship && field.attributes.relationship.object_id,
                                                    fieldId: field.attributes && field.attributes.relationship && field.attributes.relationship.field_id
                                                }}
                                                //error={nameError}
                                                //className={nameError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
                                                required={field.attributes.required} />
                                        </Col>
                                    }
                                })
                            }
                        </Row>
                    </Col>)
                }
            </Row>
        </Container>
        )
    }

    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">{id ? "Edit Record" : "New Record"}:</span>
                    <span className="ml-1" style={{ color: "#b12f2d", fontWeight: "bold" }}>In {currentObject.label}</span>
                    <span style={{ display: "flex" }}>{id ? "Edit" : "Create new"} record item</span>
                </Col>
                <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" >
                    {
                        id ? <CustomButton
                            variant="dark"
                            text="Update"
                            type="submit"
                            className="mr-2"
                            id="createFieldUpdate"
                            onClick={handleUpdate}
                        /> : <CustomButton
                                variant="dark"
                                text="Save"
                                type="submit"
                                className="mr-2"
                                id="createFieldSave"
                                onClick={handleSubmit}
                            />
                    }
                    <CustomButton
                        variant="dark"
                        text="Cancel"
                        type="submit"
                        id="createFieldCancel"
                        onClick={() => props.history.push(`/user/${activeApplication._id}/${currentObject._id}/`)}
                    />
                </Col>
            </Row>
            {
                renderFormWithJson()
            }
            {/* <Row className="mt-3">
                <Col >
                    <span>Created By: </span>
                    <span>{props.userData && props.userData.user && props.userData.user.username}</span>
                    <span>(Who is Logged in & Creating the record)</span>
                </Col>
            </Row> */}


            <Row className="mt-3">
                <Col className="createRecordFooterButton">
                    {
                        id ? <CustomButton
                            variant="dark"
                            text="Update"
                            type="submit"
                            className="mr-2"
                            id="createFieldUpdate"
                            onClick={handleUpdate}
                        /> : <CustomButton
                                variant="dark"
                                text="Save"
                                type="submit"
                                className="mr-2"
                                id="createFieldSave"
                                onClick={handleSubmit}
                            />
                    }
                    <CustomButton
                        variant="dark"
                        text="Cancel"
                        type="submit"
                        id="createFieldCancel"
                        onClick={() => props.history.push(`/user/${activeApplication._id}/${currentObject._id}/`)}
                    />
                </Col>
            </Row>

        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        createdRecord: state.records.createdRecord,
        userData: state.users.loginUserData
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        createRecord,
        updateRecord,
        getFieldsByObjectId,
        getRecordById
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Create));
