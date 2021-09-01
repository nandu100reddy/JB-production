import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFieldById } from '../../../../../core/actions/Fields.action';
import CustomButton from '../../../../components/atom/Button';
import Checkbox from '../../../../components/atom/Checkbox';



const View=props=> {

    const { id } = props.match.params;

    const [getBasicField, setBasicField] = useState([])

    const [getBasicFieldData, setBasicFieldData] = useState([])

    const [getDisplayInfo, setDisplayInfo] = useState([])

    const [getDisplayInfoData, setDisplayInfoData] = useState([])

    const [field, setField] = useState({})

    const basicFieldTab = [
        {
            fieldHeading: "Field Name"
        },
        {
            fieldHeading: "Required"
        },
        {
            fieldHeading: "Description"
        },
        {
            fieldHeading: "Unique"
        },
        {
            fieldHeading: "API Name"
        },
        {
            fieldHeading: "Data Type"
        },
        {
            fieldHeading: "Object"
        },
        {
            fieldHeading: "Created by"
        },
        {
            fieldHeading: "Last Updated by"
        },

    ]

    const basicFieldDataTab = {
        fieldName: "Father's Name",
        required: "check",
        description: "",
        unique: "check",
        apiName: "FathersName__c",
        datatype: "Textfield(Short)",
        object: "Contact",
        createdBy: "Suraj Kumar,Mar 20,2021 9:00AM",
        updatedBy: "Jiten M,Apr 24,2021 12:00PM",
    }


    const displayInfoTab = [
        {
            headingDisplayInfo: "Display Name"
        },
        {
            headingDisplayInfo: "Tooltop Info"
        }
    ]

    const displayInfoDataTab = [
        {
            displayName: "Jiten",
            toolTipInfo: ""
        }
    ]

    const fetchBasicFieldHeading = () => {
        setBasicField(basicFieldTab)
    }

    const fetchBasicFieldData = () => {
        setBasicFieldData(basicFieldDataTab)
    }

    const fetchDisplayInfoHeading = () => {
        setDisplayInfo(displayInfoTab)
    }

    const fetchdisplayInfoData = () => {
        setDisplayInfoData(displayInfoDataTab)
    }

    useEffect(() => {
        fetchBasicFieldHeading();

        fetchBasicFieldData();

        fetchDisplayInfoHeading();

        fetchdisplayInfoData();

        getFieldById()
    }, [])

    const getFieldById = async () => {
        props.loadFieldById(id).then(response => {
            if (response && response.status === 200) {
                const { data, data: { result, result: { field } } } = response;
                if (data.statusCode === 1) {
                    {console.log('result>>>>',data)}
                    // setField(field);
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }

    const showdisplayInfoData = () => {
        return (
            getDisplayInfoData.map(item => {
                return (
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col className="textgray_viewField" style={{ marginTop: "-2.3%" }}>{item.displayName}</Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col className="textgray_viewField" style={{ marginTop: "-2.3%" }}>{item.toolTipInfo}</Col>
                    </Row>
                )
            })
        )
    }

    const showDisplayInfoHeading = () => {
        return (
            getDisplayInfo.map(item => {
                return (
                    <Container fluid>
                        <Row>

                            {item.headingDisplayInfo === "Display Name" ? <Col>

                                <span className="heading_eachline bold_800">{item.headingDisplayInfo}</span><span style={{ fontSize: "10px", color: "grey" }}></span>

                            </Col> : <Col className="heading_eachline bold_800">{item.headingDisplayInfo}</Col>
                            }

                        </Row>
                    </Container>
                )
            })
        )
    }

    const showBasicObject = () => {

        return (
            <>
                <Row>
                    <Col xs={3}><span className="heading_eachline bold_800">Field Name</span><span className="textgray_viewField ml-4">{getBasicFieldData.fieldName}</span></Col>

                    <Col xs={3} className="rowdir_viewField bold_800"> <span className="heading_eachline">Required </span><span style={{ marginLeft: "18%" }} className="textgray_viewField">{getBasicFieldData.required === 'check' ? <Checkbox /> : <></>}</span></Col>

                </Row>

                <Row className="mt-3">
                    <Col xs={3}><span className="heading_eachline bold_800">Description</span> <span className="textgray_viewField ml-5">{getBasicFieldData.description}</span></Col>

                    <Col xs={3} className="rowdir_viewField bold_800"><span className="heading_eachline">Unique</span> <span style={{ marginLeft: "22%" }} className="textgray_viewField">{getBasicFieldData.unique === "check" ? <Checkbox /> : <></>}</span></Col>

                </Row>
                <Row className="mt-3">
                    <Col xs={3}><span className="heading_eachline bold_800">API Name</span> <span style={{ marginLeft: "8.5%" }} className="textgray_viewField">{getBasicFieldData.apiName}</span></Col>

                    <Col xs={3}><span className="heading_eachline bold_800">Data Type </span><span className="textgray_viewField ml-5">{getBasicFieldData.datatype}</span></Col>

                </Row>

                <Row className="mt-3">
                    <Col xs={3}><span className="heading_eachline bold_800">Object</span> <span style={{ marginLeft: "16%" }} className="textgray_viewField">{getBasicFieldData.object}</span></Col>

                    <Col xs={3}></Col>

                </Row>

                <Row className="mt-3">
                    <Col xs={3}><span className="heading_eachline bold_800">Created by</span> <span className="textgray_viewField ml-4">{getBasicFieldData.createdBy}</span></Col>

                    <Col xs={3}><span className="heading_eachline bold_800">Last Updated by</span> <span className="textgray_viewField ml-1">{getBasicFieldData.updatedBy}</span></Col>

                </Row>
            </>
        )
    }

    const handleSubmit = () => {
        alert("Hello Save")
    }

    const handleCancel = () => {
        alert("Hello Cancel")
    }

    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}><span className="heading_eachline">Custom Field :</span><span className="heading_CreateEditObject ml-1">Father's Name</span><span className='mt-2' style={{ display: "flex",fontSize:"13px" }}>View Detail of Custom Field</span>
                </Col>
                <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-2" >
                    <CustomButton
                        id="viewSubmit"
                        variant="dark"
                        onClick={handleSubmit}
                        // disabled={!isValidate}
                        text="Save"
                        type="submit"
                        className="mr-2"
                    />
                    <CustomButton
                        id="viewCancel"
                        variant="dark"
                        onClick={handleCancel}
                        // disabled={!isValidate} 
                        text="Cancel"
                        type="submit"
                    />
                </Col>
            </Row>

            <Row xs={1} className="table_div_margin_objectList border_createEditscreen">
                <Col className="heading_object_screens heading_eachline pl-4 ">Basic Field Information</Col>

                <Col className="p-4">
                    {showBasicObject()}
                </Col>

                <Col className="heading_object_screens heading_eachline pl-4 ">Field Display Information</Col>
                <Col>
                    <Row xs={1} className="mt-3 mb-3">
                        <Col style={{ display: 'flex', flexDirection: "row", backgroundColor: "#fff" }}>
                            {showDisplayInfoHeading()}
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: "row", backgroundColor: "#fff" }}>

                            {showdisplayInfoData()}

                        </Col>

                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    // return {
    //     field: state.field.field
    // }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        loadFieldById
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(View));