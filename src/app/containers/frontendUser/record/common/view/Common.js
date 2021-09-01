import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Common = props => {
    return (
        <Container fluid>
            <Row xs={1}>
                <Col xs={12} className="mt-3">
                    <Col style={{ border: "2px solid #e6e6e6" }} className="mt-3 p-2 ml-2 mr-2" >
                        <Row>
                            <Col xs={6}>
                                <span style={{ marginLeft: "17%" }} className="fontWeight_RecordView">Created By</span>
                                <span className="heading_CreateEditObject ml-3">Matt</span>
                                <span className="textColor_RecordView">,1/16/2021 10:34 PM</span>
                            </Col>
                            <Col xs={6}>
                                <span style={{ marginLeft: "10%" }} className="fontWeight_RecordView">Last Updated By</span>
                                <span className="heading_CreateEditObject ml-3">Matt</span>
                                <span className="textColor_RecordView">,1/16/2021 10:34 PM</span>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(Common);