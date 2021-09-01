import React from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import DataTable from '../../../../../components/common/dataTable/DataTable';
import CustomButton from '../../../../../components/atom/Button';
import { useHistory } from "react-router-dom";


const ExtensionGroupDetailedView =props=>{

const history = useHistory();

    const columns=[
        {
         dataField: 'ExtensionGroupName',
         text: "Extension Group Name",
         formatter: (cell, row) => <CustomButton
                variant="link"
                text={row.ExtensionGroupName}
                type="button"
                id="viewButton"
                 onClick={() => props.history.push(`/setup/ExtensionGroupDetailedView`)}
            />       
        },
        {
            dataField: 'NoofUsers',
            text: "No. of Users",       
        },
        {
            dataField: 'Type',
            text: "Type",       
        },
        {
            dataField: 'Purpose',
            text: "Purpose",       
        },
        {
            dataField: 'ProfileExtension',
            text: "Profile Extension",       
        },
        {
            dataField: 'Profile',
            text: "Profile",       
        },
        {
            dataField: 'CreatedBy',
            text: "Created By",       
        },
        {
            dataField: 'LastUpdatedBy',
            text: "Last Updated By",       
        },
        {
            dataField: '',
            text: "Action",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => props.history.push(`/setup/${row.name.replace(/\s/g, '')}/edit/${row._id}`)}
                    /><span className="actionSeperator">|</span>
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        // onClick={() => handleDeleteApplication(row._id)}
                    />
                </div>
            }       
        },

    ]

    const data = [
        {
            ExtensionGroupName:"Extension Group 1",
            NoofUsers:3,
            Type:"Custom",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"Jiten M,2021/08/10,20:12:09",
            LastUpdatedBy:"",
        },
        {
            ExtensionGroupName:"Extension Group 2",
            NoofUsers:5,
            Type:"Custom",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"Jiten M,2021/08/10,20:12:09",
            LastUpdatedBy:"",
        },
        {
            ExtensionGroupName:"Extension Group 3",
            NoofUsers:1,
            Type:"Custom",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"Jiten M,2021/08/10,20:12:09",
            LastUpdatedBy:"Jiten M,2021/08/10,20:12:09",
        },
        {
            ExtensionGroupName:"Extension Group 4",
            NoofUsers:36,
            Type:"Custom",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"",
            LastUpdatedBy:"",
        },
        {
            ExtensionGroupName:"Extension Group 5",
            NoofUsers:25,
            Type:"Custom",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"",
            LastUpdatedBy:"",
        },
        {
            ExtensionGroupName:"Extension Group 6",
            NoofUsers:9,
            Type:"",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"",
            LastUpdatedBy:"",
        },
        {
            ExtensionGroupName:"Extension Group 7",
            NoofUsers:7,
            Type:"",
            Purpose:"",
            ProfileExtension:"",
            Profile:"",
            CreatedBy:"",
            LastUpdatedBy:"",
        },
    ]

    return(
        <Container fluid>
             <Row className="header_createeditobject row align-items-center">
                <Col v>
               <b>Extension Group :</b>&nbsp;<span className="heading_CreateEditObject">Sales Profile</span>
               </Col>
               <Col xm={4}>
               <b>Total Assigned Users: </b>&nbsp;<span className="heading_CreateEditObject">{data.length}</span>
               </Col>
               <Col></Col>
               <Col xs={2}>
               <CustomButton
                variant="dark" 
                text="Back"
                type="button"
                className="ml-2"
                id="back"
                onClick={() => history.goBack()}
                />
               </Col>
            </Row>
            <Row className="exten_group-info-bx">
        <DataTable
          keyField="text"
          columns={columns}
          data={data}  
        />
        </Row>
        </Container>
    )
}

export default ExtensionGroupDetailedView