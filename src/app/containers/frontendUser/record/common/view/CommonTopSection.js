import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CustomButton from '../../../../../components/atom/Button';

const CommonTopSection = props => {
    const { activeApplication, currentObject, highlightPanel } = props;

    return (
        <Row xs={1}>
            <Col className="mt-2 header_Top_View">
                <Row>
                    <Col xs={6}>
                        <span className="heading_CreateEditObject">
                            {highlightPanel.length > 0 ? `${highlightPanel[0].field.name} : ${highlightPanel[0].data}` : ""}
                        </span>
                        <span className="fontWeight_RecordView" style={{ display: "flex" }}>{currentObject.name}</span>
                    </Col>
                    <Col xs={6} className="btnUpdate_RecordView pt-2 ">
                        <CustomButton
                            id="ObjectUpdate"
                            variant="dark"
                            text="Back"
                            type="button"
                            onClick={() => props.history.push(`/user/${activeApplication._id}/${currentObject._id}/`)}
                        />
                    </Col>
                </Row>
            </Col>

            <Col className="p-2 header_Bottom_View">
                {
                    highlightPanel.length != 0 && highlightPanel.map((item, index) => {
                        if (index > 0) {
                            return <strong className="fontWeight_RecordView" key={item.field_id} >
                                {item.field && item.field.name}: <span className="mr-5 textColor_RecordView">
                                    {typeof item.data === 'object' && item.data !== null ? item.data.label :
                                        item.data && new Date(item.data) != "NaN" ? item.data.split("T")[0] : item.data}
                                </span>
                            </strong>
                        }
                    }
                    )
                }
            </Col>
        </Row >
    )
}

export default withRouter(CommonTopSection);