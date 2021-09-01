import React from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import DataTable from '../../../../../components/common/dataTable/DataTable';



const ProfileUsers =props=>{

    const columns=[
        {
         dataField: 'Name',
         text: "Name",       
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
            dataField: 'DateCreated ',
            text: "Date Created ",       
        },
        {
            dataField: 'Active',
            text: "Active",       
        },
        {
            dataField: 'Manager',
            text: "Manager",       
        },

    ]

    const data = [
        {
            Name:"User Name 1",
            UserName:"user1@test.com",
            Email:"",
            DateCreated:"",
            Active:"",
            Manager:"Manager1",
        },
        {
            Name:"User Name 2",
            UserName:"user2@test.com",
            Email:"",
            DateCreated:"",
            Active:"",
            Manager:"Manager2",
        },
        {
            Name:"User Name 3",
            UserName:"user3@test.com",
            Email:"",
            DateCreated:"",
            Active:"",
            Manager:"Manager3",
        },
        {
            Name:"User Name 4",
            UserName:"user4@test.com",
            Email:"",
            DateCreated:"",
            Active:"",
            Manager:"Manager4",
        },
    ]

    return(
        <Container fluid>
             <Row className="header_createeditobject row align-items-center">
                <Col>
               <b>Profile :</b>&nbsp;<span className="heading_CreateEditObject">Sales Profile</span>
               </Col>
               <Col xm={3}>
               <b>Total Assigned Users: </b>&nbsp;<span className="heading_CreateEditObject">{data.length}</span>
               </Col>
            </Row>
        <DataTable
          keyField="text"
          columns={columns}
          data={data}  
        />
        </Container>
    )
}

export default ProfileUsers