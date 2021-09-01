import React from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import CustomButton from '../../../../../components/atom/Button';
import DataTable from '../../../../../components/common/dataTable/DataTable';

const ExtensionGroupInfo =props=>{

    const columns = [
        {
            dataField: 'Name',
            text: "Name",
            hidden: true
        },
        {dataField: 'Name',
        text: "Name",
        formatter: (cell, row) => <CustomButton
                variant="link"
                text={row.Name}
                type="button"
                id="Name"
                onClick={() => props.history.push(`/setup/${row.Name.replace(/\s/g, '')}/view/${row._id}`)}
            />  
        },
        {
        dataField: 'UserName',
        text: "UserName",  
        },
        {
        dataField: 'Email',
        text: "Email",  
        },
    
        {
        dataField: 'DateCreated',
        text: "Date Created",  
        },
        {
            dataField: 'Active',
            text: "Active",  
        },
        {
            dataField: 'UserProfile',
            text: "User Profile",  
        },
        {
            dataField: 'Manager',
            text: "Manager",
            sort: true,
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Manager"
                        type="button"
                        id="Manager"
                        // onClick={() => row && row.custom ?
                        //     props.history.push(`/setup/object/edit/${row._id}`) :
                        //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                        // }
                    /> 
                </div>
            }
            
        },

        
    ]

    const data = [
        {
            Name:"User Name1",
            UserName:"",
            Email:"username1@test.com",
            DateCreated:"",
            Active:"",
            UserProfile:"",
            Manager:"Manager1"
        },
        {
            Name:"User Name2",
            UserName:"",
            Email:"username2@test.com",
            DateCreated:"",
            Active:"",
            UserProfile:"",
            Manager:"Manager2"
        },
        {
            Name:"User Name3",
            UserName:"",
            Email:"username3@test.com",
            DateCreated:"",
            Active:"",
            UserProfile:"",
            Manager:"Manager3"
        },
        {
            Name:"User Name4",
            UserName:"",
            Email:"username4@test.com",
            DateCreated:"",
            Active:"",
            UserProfile:"",
            Manager:"Manager4"
        },
    ]

    return(
        <>
        <Container fluid>
        <Row className="header_createeditobject row align-items-center">
               <span className="profile_heading">Extension Group Info :</span>&nbsp;<span className="heading_CreateEditObject">Sales Profile</span>
            </Row>
            <Row>
            <Col xs={3} className="mb-2">
    <span className="profile_heading">Extension Group Name</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Extension Group1</span>
    </Col>
    <Col xs={3}>
    <span className="profile_heading">Type</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">Custom</span>
    </Col>

    <Col xs={3} className="mb-2">
    <span className="profile_heading">No. of Users</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">7</span>
    </Col>
    <Col xs={3}>
    <span className="profile_heading">Profile Extension </span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">---</span>
    </Col>

    <Col xs={3}>
    <span className="profile_heading">Purpose</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">---</span>
    </Col>

    <Col xs={3}>
    <span className="profile_heading">Profile</span>
    </Col>
    <Col xs={3}>
    <span className="profile_des">---</span>
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

            <Row className="header_createeditobject" style={{display:"flex",justifyContent:"flex-end"}}>
               <CustomButton
               text="Add User to this group"      
               />
            </Row>
            <Row className="exten_group-info-bx">
<DataTable
keyField="id"
columns={columns}
data={data}
    />
            </Row>
        </Container>
        </>
    )
}
export default ExtensionGroupInfo