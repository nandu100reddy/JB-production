import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadApplicationById } from '../../../../../core/actions/Applications.action';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import CustomButton from '../../../../components/atom/Button';



const View = props => {
    const { id } = props.match.params;
    const [accordionArrowState, setAccordionArrowState] = useState("1");
    const [application, setApplication] = useState({})

    useEffect(() => {
        getApplicationById();
    }, [])

    /**
     * Function for get application details by application Id
     */
    const getApplicationById = async () => {
        props.loadApplicationById(id).then(response => {
            if (response && response.status === 200) {
                const { data, data: { result, result: { application } } } = response;
                if (data.statusCode === 1) {
                    setApplication(application);
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }
    /**
     * function handle accordion arrow state -  open and down
     * @param {string} stateValue - value of current accordion
     */
    const handleAccordionArrowState = (stateValue) => {
        setAccordionArrowState(stateValue)
    }


    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">View Application: </span><span className="heading_eachlinename">{application.name}</span><br></br>
                    <span className="subheading_eachline">View the Application items</span>
                </Col>
                <Col sm={6} className="pt-3 text-right inlineBtnWrap">
                    <CustomButton
                        id="applicationBack"
                        type="button"
                        onClick={() => props.history.push('/setup/applications')}
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
                                <span className="grey_Button">Basic Application Information</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "0" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Row>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Application Name:</strong></Col>
                                                <Col sm="8" ><span>{application.name}</span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="createdModifiedBy">
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Created By:</strong></Col>
                                                <Col sm="8" ><span>{application.created_by_id}</span></Col>
                                            </Row>
                                        </Col>
                                        <Col sm="6" >
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Last Modified By:</strong></Col>
                                                <Col sm="8" ><span>{application.last_modified_by_id}</span>
                                                </Col></Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* -------------Object Display Information Start------------------- */}
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => handleAccordionArrowState("1")}>
                                <span className="grey_Button">Application Display Information</span>
                                <span className="arrow_ViewScreen">{accordionArrowState === "1" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row>
                                        <Col sm="6">
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Display Name :</strong><br></br>
                                                    <span className="supportiveText">(Singular)</span>

                                                </Col>
                                                <Col sm="8" >
                                                    <span>{application.label}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm="6">
                                            <Row>
                                                <Col sm="4" className="txtRight">
                                                    <strong className="heading_eachline">Plural Name:</strong>
                                                </Col>
                                                <Col sm="8" >
                                                    <span>{application.plural_label}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        application: state.application.application
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        loadApplicationById
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(View));

