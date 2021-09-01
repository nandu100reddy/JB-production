import React,{useState,useEffect} from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import DataTable from '../../../../components/common/dataTable/DataTable';
import CustomButton from '../../../../components/atom/Button';
import Input from '../../../../components/atom/Input';
import Checkbox from '../../../../components/atom/Checkbox';
import { useHistory } from "react-router-dom";

const List =props=>{

    const history = useHistory();

    const [getSearchProfile, setSearchProfile] = useState('')
    const [getList, setList] = useState([])
    const [getTempList, setTempList] = useState([])
    const [selected, setSelected] = useState([]);


    const TableTab = [
        {   
            ProfileId:1,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Standard",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"

        },
        {   ProfileId:2,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Standard",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"
        },
        {   ProfileId:3,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Custom",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"   
        },
        {
            ProfileId:4,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Standard",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"
        },
        {
            ProfileId:5,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Custom",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"  
        },
        {   
            ProfileId:6,
            ProfileName: "Sales User",
            LicenseType: "Basic Sales",
            Type: "Custom",
            CreatedBy: "Jiten M",
            CreatedDate:"2021/09/02",
            UpdatedBy:"Jiten M",
            UpdatedDate:"2021/10/10"  
        },
    ]

    const columns = [
        {
            dataField: 'ProfileId',
            text: "Profile Id",
        },
        {
            dataField: 'ProfileName',
            text: "Profile Name",
            hidden: true
        },
        {dataField: 'ProfileName',
        text: "Profile Name",
        formatter: (cell, row) => <CustomButton
                variant="link"
                text={row.ProfileName}
                type="button"
                id="viewButton"
                onClick={() => props.history.push(`/setup/${row.ProfileName.replace(/\s/g, '')}/view/${row._id}`)}
            />  
        },
        
        {
        dataField: 'LicenseType',
        text: "License Type",  
        },
        {
        dataField: 'Type',
        text: "Type",  
        },
    
        {
        dataField: 'CreatedBy',
        text: "Created By",  
        },
        {
            dataField: 'CreatedDate',
            text: "Created Date",  
            },
        {
            dataField: 'UpdatedBy',
            text: "Updated By",  
            },
            {
                dataField: 'UpdatedDate',
                text: "Updated Date",  
                },
        {
            dataField: 'action',
            text: "Actions",
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
                    <span className="actionSeperator">|</span>
                    <CustomButton
                        variant="link"
                        text="Clone"
                        type="button"
                        id="cloneButton"
                       // onClick={() => handleDelete(row._id)}
                    />
{row.Type =='Custom' ? <><span className="actionSeperator">|</span><CustomButton
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
    
    const handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            setSelected([...selected, row._id]);
        }
        else {
            setSelected(selected.filter(x => x !== row._id))
        }
    }

    const handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
        if (isSelect) {
            setSelected(ids)
        } else {
            setSelected([])
        }
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToEdit: true,
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll
    };


    const handleClick = () => {

        var tempArr = []
        getTempList.map(item => {
            const srchData = item.FieldDisplayName.toLowerCase()
            if (srchData.includes(getSearchProfile.toLowerCase())) {
                tempArr.push(item)
            }
           
        })
        setList(tempArr)
    }

    const handleBlur = () => {

    }

    const handleCloneProfile = () => {
        alert("handleCloneProfile")
    }

    return(
        <>
         <Container fluid>
            <Row className="header_createeditobject row align-items-center">
                <Col sm={4}>
                    {/* <span className="heading_eachline">Profiles :</span> */}
                <span className="heading_CreateEditObject">Profiles</span><span style={{ display: "flex" }} >List of All Profiles</span><span style={{ fontSize: "12px", color: "#636e72" }} >{TableTab.length}+ Profile Found</span>
                </Col>

                <Col sm={4}>
                   
                </Col>

                <Col sm={4} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" ><div className="fieldhistory_list" >

                    <CustomButton
                        variant="dark"
                        text="New Profile"
                        type="button"
                        className="mr-2"
                        id="NewProfile"
                        // onClick={() => props.history.push(`/setup/${objectId}/field/create`)}
                    />
                    {/* <CustomButton
                        variant="dark"
                        text="Clone Profile"
                        type="submit"
                        id="CloneProfile"
                        // disabled={!isValidate}
                        onClick={handleCloneProfile}
                    /> */}
                </div>
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
           
            {TableTab.length!=0?<div>
               
               <DataTable 
               keyField="_id"
               defaultSortField="_id"
               selectRow={selectRow}
               columns={columns}
               data={TableTab}
               />
           </div>:<></>}
        </Container>
        </>
    )
}

export default List