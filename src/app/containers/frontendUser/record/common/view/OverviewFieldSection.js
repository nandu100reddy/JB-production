import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import _ from "lodash";

const OverviewFieldSection = props => {
    const { recordDetails } = props;
    return (
        <Row>
            <Col xs={12} className="mt-2 p-2 fontWeight_RecordView bgColorBorder_RecordView" >
                {recordDetails.section}
            </Col>
            <Col xs={12} className="bgColorFFFBorder_RecordView" >
                <Row>
                    {
                        recordDetails.fields.map(field => {
                            return <Col xs={6}>
                                <Row>
                                    {
                                        field.map(item => item.key === "blank_space" ?
                                            <Col xs={12} className="pt-1 pb-1 ">
                                                <span className="fontWeight_RecordView pl-2"></span>
                                                <span className="heading_CreateEditObject ml-3"></span>
                                            </Col> :
                                            <Col xs={12} className="pt-1 pb-1">
                                                <span className="fontWeight_RecordView pl-2">{item.field ? item.field.name : item.key.replaceAll("_", " ")} :</span>
                                                <span className=" ml-2">{typeof item.data === 'object' && item.data !== null ? item.data.label :
                                                    item.data && new Date(item.data) != "NaN" ? item.data.split("T")[0] : item.data}</span>
                                            </Col>)
                                    }
                                </Row>
                            </Col>
                        }
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default withRouter(OverviewFieldSection);