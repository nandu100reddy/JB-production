import React from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import DataTable from '../../../../../components/common/dataTable/DataTable';
import CustomButton from '../../../../../components/atom/Button';



const ProfileExtensions =props=>{

    const columns=[
        {
         dataField: 'ProfileExtensionName',
         text: "Profile Extension Name",
         formatter: (cell, row) => {
            return <div className="inlineBtnWrap">
                <CustomButton
                variant="link"
                text={row.ProfileExtensionName}
                type="button"
                id="editButton"
                // onClick={() => row && row.custom ?
                //     props.history.push(`/setup/object/edit/${row._id}`) :
                //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                // }
            //    onClick={()=>props.history.push(`/setup/FieldAccess`)}
            /> 
            
            </div>
        }       
        },
        {
            dataField: 'ExtensionType',
            text: "Extension Type",       
        },
        {
            dataField: 'Purpose',
            text: "Purpose",       
        },
        {
            dataField: 'Profile',
            text: "Profile",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text={row.Profile}
                    type="button"
                    id="editButton"
                    // onClick={() => row && row.custom ?
                    //     props.history.push(`/setup/object/edit/${row._id}`) :
                    //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    // }
                //    onClick={()=>props.history.push(`/setup/FieldAccess`)}
                /> 
                
                </div>
            }       
                   
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
            dataField: 'Action',
            text: "Action",
            sort: true,
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Update"
                        type="button"
                        id="editButton"
                        // onClick={() => row && row.custom ?
                        //     props.history.push(`/setup/object/edit/${row._id}`) :
                        //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                        // }
                    /> 
                    {/* <span className="actionSeperator">|</span>
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="cloneButton"
                       // onClick={() => handleDelete(row._id)}
                    /> */}
{row.ExtensionType =='Custom' ? <><span className="actionSeperator">|</span><CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                       // onClick={() => handleDelete(row._id)}
                    /></>:<></>}
                    
                  

                </div>
            }       
        },

    ]

    const data = [
        {
            ProfileExtensionName:"Profile Extension 1",
            ExtensionType:"Standard",
            Purpose:"",
            Profile:"Sales User",
            CreatedBy:"Jiten M,2020/09/09,20:12:09",
            LastUpdatedBy:"Jiten M,2020/09/09,20:12:09",
        },
        {
            ProfileExtensionName:"Profile Extension 2",
            ExtensionType:"Custom",
            Purpose:"",
            Profile:"Sales User",
            CreatedBy:"Jiten M,2020/09/09,20:12:09",
            LastUpdatedBy:"Jiten M,2020/09/09,20:12:09",
        },
        {
            ProfileExtensionName:"Profile Extension 3",
            ExtensionType:"Custom",
            Purpose:"",
            Profile:"Sales User",
            CreatedBy:"Jiten M,2020/09/09,20:12:09",
            LastUpdatedBy:"Jiten M,2020/09/09,20:12:09",
        },
        {
            ProfileExtensionName:"Profile Extension 4",
            ExtensionType:"Custom",
            Purpose:"",
            Profile:"Sales User",
            CreatedBy:"Jiten M,2020/09/09,20:12:09",
            LastUpdatedBy:"Jiten M,2020/09/09,20:12:09",
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

export default ProfileExtensions