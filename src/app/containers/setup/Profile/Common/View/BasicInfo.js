import React from 'react';
import { Container, Row, Col,Nav,Tabs, Tab} from 'react-bootstrap';



const BasicInfo =props=>{

    return(
        <>
    <Container fluid>
<Row style={{backgroundColor:"#f7f7f7"}} className="mb-2 p-2">
<span className="profile_heading">Basic Profile Information</span>
</Row>
<Row>
    <Col xs={3} className="mb-2">
    <span className="profile_heading">Profile Name</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Sales User</span>
    </Col>
    <Col xs={3}>
    <span className="profile_heading">User License</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Basic Sales</span>
    </Col>

    <Col xs={3} className="mb-2">
    <span className="profile_heading">Description</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">---</span>
    </Col>
    <Col xs={3}>
    <span className="profile_heading">Profile Type </span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Standard</span>
    </Col>

    <Col xs={3}>
    <span className="profile_heading">Created By </span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Jiten M ,2021/09/01,20:12:21</span>
    </Col>
    <Col xs={3}>
    <span className="profile_heading">Last Updated By </span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Jiten M ,2021/10/05,16:15:20</span>
    </Col>
</Row>
    </Container>
        </>
    )
}

export default BasicInfo