import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getObjectById } from '../../../../../core/actions/Objects.action';
import { Container, Row, Col, Button, Form, Accordion, Card, Nav } from 'react-bootstrap';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import CustomButton from '../../../../components/atom/Button';
import Checkbox from '../../../../components/atom/Checkbox';
import DataTable from '../../../../components/common/dataTable/DataTable'


const View = props => {
    const { applicationId, match: { params: { id } } } = props;
    const [accordionArrowState, setAccordionArrowState] = useState("1")
    const [object, setObject] = useState({
        _id: id,
        name: '',
        label: '',
        plural_label: '',
        description: '',
        api_name: '',
        custom: '',
        active: '',
        created_by_id: '',
        last_modified_by_id: '',
    });

    useEffect(() => {
        props.getObjectById(id, applicationId)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    if (data.statusCode === 1 && result) {
                        setObject(result);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }, [])
    /**
     * function handle accordion arrow state -  open and down
     * @param {string} stateValue - value of current accordion
     */
    const handleAccordionArrowState = (stateValue) => {
        setAccordionArrowState(stateValue)
    }
    const handleView = () => {

    }
    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

    const standardFieldsColumns = [
        {
            dataField: '',
            text: "Field Id",
            formatter: (cell, row) => <CustomButton
                variant="link"
                text="Field_Id"
                // {row._id}
                type="button"
                id="viewButton"
                onClick={() => handleView(row)}
            />
        },
        {
            dataField: "FieldLabel",
            text: "Field Label"
        },
        {
            dataField: "FieldName",
            text: "Field Name"
        },
        {
            dataField: "FieldType",
            text: "Field Type"
        },
        {
            dataField: "HistoryTracking",
            text: "History Tracking"
        },
        {
            dataField: '',
            text: "Actions",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => handleEdit(row)}
                    />
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        onClick={() => handleDelete(row)}
                    />
                </div>
            }
        },
    ]

    const CustomFieldsColumns = [
        {
            dataField: '',
            text: "Field Id",
            formatter: (cell, row) => <CustomButton
                variant="link"
                text="Field_Id"
                // {row._id}
                type="button"
                id="viewButton"
                onClick={() => handleView(row)}
            />
        },
        {
            dataField: 'FieldLabel',
            text: "Field Label"
        },

        {
            dataField: 'FieldName',
            text: "Field Name"
        },
        {
            dataField: 'apiName',
            text: "API Name"
        },
        {
            dataField: 'FieldType',
            text: "Field Type"
        },
        {
            dataField: 'HistoryTracking',
            text: "History Tracking"
        },
        {
            dataField: '',
            text: "Actions",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => handleEdit(row)}
                    />
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        onClick={() => handleDelete(row)}
                    />
                </div>
            }
        },
    ]

    const validationRuleColumns = [
        {
            dataField: '',
            text: "Field Id",
            formatter: (cell, row) => <CustomButton
                variant="link"
                text="Field_Id"
                // {row._id}
                type="button"
                id="viewButton"
                onClick={() => handleView(row)}
            />
        },

        {
            dataField: 'RuleName',
            text: "Rule Name"
        },

        {
            dataField: 'Description',
            text: "Description"
        },
        {
            dataField: 'ErrorLocation',
            text: "Error Location"
        },
        {
            dataField: 'Active',
            text: "Active?"
        },
        {
            dataField: '',
            text: "Actions",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => handleEdit(row)}
                    />
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        onClick={() => handleDelete(row)}
                    />
                </div>
            }
        },
    ]

    const ButtonAndLinkColumns = [
        {
            dataField: '',
            text: "Field Id",
            formatter: (cell, row) => <CustomButton
                variant="link"
                text="Field_Id"
                // {row._id}
                type="button"
                id="viewButton"
                onClick={() => handleView(row)}
            />
        },
        {
            dataField: 'ButtonName',
            text: "Button Name"
        },

        {
            dataField: 'ButtonDisplayName',
            text: "Button Display Name"
        },
        {
            dataField: 'Description',
            text: "Description"
        },
        {
            dataField: 'ButtonType',
            text: "Button Type"
        },
        {
            dataField: '',
            text: "Actions",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => handleEdit(row)}
                    />
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        onClick={() => handleDelete(row)}
                    />
                </div>
            }
        },

    ]

    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">View Object: </span><span className="heading_eachlinename">{object.name}</span><br></br>

                    <span className="subheading_eachline">View the Object items</span>
                </Col>
                <Col sm={6} className="pt-3 text-right inlineBtnWrap">
                    <CustomButton
                        id="ObjectBack"
                        type="button"
                        onClick={() => applicationId ?
                            props.history.push(`/setup/${applicationId._id}/objects`) :
                            props.history.push(`/setup/objects`)}
                        variant="dark"
                        text="Back"
                    />
                </Col>
            </Row>
            <Row >
                <Col className="objectMainView">
                    <Accordion defaultActiveKey="0" className="accordion_billing" >

                        {/* -------------Basic Object Information Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => handleAccordionArrowState("0")}>
                                <span className="grey_Button">Basic Object Information</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "0" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Row>
                                        <Col sm="6" >
                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Name: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.name || ''}</span>
                                                </Col>
                                            </Row>

                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Label: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.label || ''}</span>
                                                </Col>
                                            </Row>

                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Plural Label: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.plural_label || ''}</span>
                                                </Col>
                                            </Row>
                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Description: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.description || ''}</span>
                                                </Col>
                                            </Row>
                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">API Name: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.api_name || ''}</span>
                                                </Col>
                                            </Row>


                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Custom: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.custom || ''}</span>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col sm="6" >
                                            <Col sm="12" className="mb-10">
                                                <Checkbox name="addNotes"
                                                    label="AddNotes(Related list to default page layout)"
                                                    checked="" />
                                            </Col>
                                            <Col sm="12" className="mb-10">
                                                <Checkbox name="addAttachment"
                                                    label="Add Attachment(Related list to default page layout)"
                                                    checked=""
                                                    disabled="true" />
                                            </Col>
                                            <Col sm="12" className="mb-10">
                                                <Checkbox name="tabMenu"
                                                    label="Display in Tab Menu"
                                                    checked=""
                                                    disabled="true" />
                                            </Col>

                                        </Col>
                                    </Row>
                                    <Row className="createdModifiedBy">
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Created By:</strong></Col>
                                                <Col sm="8" ><span>{object.created_by_id || ''}</span></Col>
                                            </Row>
                                        </Col>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Last Updated By:</strong></Col>
                                                <Col sm="8" ><span>{object.last_modified_by_id || ''}</span>
                                                </Col></Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Object Display Information Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => handleAccordionArrowState("1")}>
                                <span className="grey_Button">Object Display Information</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "1" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row>
                                        <Col sm="6">
                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Label: </strong><span style={{ fontSize: "10px", color: "grey" }}>(Singular)</span>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.label}</span>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col sm="6">
                                            <Row className="mb-10">
                                                <Col sm="4" className="txtRight" >
                                                    <strong className="heading_eachline">Plural Label: </strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{object.plural_label}</span>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Standard Fields Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2" onClick={() => handleAccordionArrowState("2")} >
                                <span className="grey_Button">Standard Fields</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "2" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Col sm="12">
                                        <DataTable
                                            keyField="_id"
                                            defaultSortField="_id"
                                            data={""}
                                            csvName={false}
                                            columns={standardFieldsColumns} />
                                    </Col>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Custom Fields Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3" onClick={() => handleAccordionArrowState("3")}>
                                <span className="grey_Button">Custom Fields</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "3" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <Row>
                                        <Col className="text-center tableButtonCenter">
                                            <CustomButton variant="dark" text="New Custom Field" type="button" />
                                            <CustomButton variant="dark" text="History Tracking" type="button" />
                                        </Col>
                                    </Row>
                                    <Col sm="12">
                                        <DataTable
                                            keyField="_id"
                                            defaultSortField="_id"
                                            data={""}
                                            csvName={false}
                                            columns={CustomFieldsColumns} />
                                    </Col>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Validation Rules Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4" onClick={() => handleAccordionArrowState("4")} >
                                <span className="grey_Button">Validation Rules</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "4" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                    <Row>
                                        <Col className="text-center tableButtonCenter">
                                            <CustomButton variant="dark" text="New Rule" type="button" />
                                        </Col>
                                    </Row>
                                    <Col sm="12">
                                        <DataTable
                                            keyField="_id"
                                            defaultSortField="_id"
                                            data={""}
                                            csvName={false}
                                            columns={validationRuleColumns} />
                                    </Col>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Record Type Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="5" onClick={() => handleAccordionArrowState("5")}>
                                <span className="grey_Button">Record Type</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "5" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                                <Card.Body>
                                    <Row >
                                        <Col className="text-center tableButtonCenter">
                                            <CustomButton variant="dark" text="New Record Rule" type="submit" />
                                        </Col>
                                    </Row>
                                    {/*there is no table here*/}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Triggers Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="6" onClick={() => handleAccordionArrowState("6")} >
                                <span className="grey_Button">Triggers</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "6" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="6">
                                <Card.Body>
                                    <Row >
                                        <Col className="text-center tableButtonCenter">
                                            <CustomButton variant="dark" text="New Trigger" type="submit" />
                                        </Col>
                                    </Row>
                                    {/*there is no table here*/}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Button & Links Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="7" onClick={() => handleAccordionArrowState("7")} >
                                <span className="grey_Button">Button & Links</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "7" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="7">
                                <Card.Body>
                                    <Row>
                                        <Col className="text-center tableButtonCenter">
                                            <CustomButton variant="dark" text="New Button" type="button" />
                                            <CustomButton variant="dark" text="New Link" type="button" />
                                        </Col>
                                    </Row>
                                    <Col sm="12">
                                        <DataTable
                                            keyField="_id"
                                            defaultSortField="_id"
                                            data={""}
                                            columns={ButtonAndLinkColumns}
                                            csvName={false}
                                        />
                                    </Col>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                    </Accordion>
                </Col>
            </Row>
        </Container >
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        singleObject: state.objects.object
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        getObjectById
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(View));
