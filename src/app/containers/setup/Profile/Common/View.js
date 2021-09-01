import React,{useState,useEffect}from 'react';
import { Container, Row, Col,Nav,Tabs, Tab} from 'react-bootstrap';
import CustomButton from '../../../../components/atom/Button';
import Checkbox from '../../../../components/atom/Checkbox';
import RadioButton from '../../../../components/atom/RadioButton';
import Dropdown from '../../../../components/atom/SelectDropdown';
import BasicInfo from './View/BasicInfo';
import ApplicationAccess from './View/ApplicationAccess';
import ObjectAccess from './View/ObjectAccess';
import FieldAccess from './View/FieldAccess';
import AdminSettings from './View/FormType';
import ProfileExtensions from './View/ProfileExtensions';
import { useHistory } from "react-router-dom";
import { FaBullseye } from 'react-icons/fa';
import { TramRounded } from '@material-ui/icons';
import ExtensionGroupDetailedView from './View/ExtensionGroupDetailedView'
const View =props=>{

    const history = useHistory();

    const [TabSetting, setTabSetting] = useState({});
    const [disabled,setDisabled] = useState(true)
    const [columnArr,setColumnArr] = useState([])
    

    const handleSelectChange = (event, name) => {
        setTabSetting({
            ...TabSetting,
            [name]: event,
            type: event.value
        })
    }

    const ApplicationAccessTab = [
        { 
            Applications:"App 1",
            Type:"Standard",
            View:"",
            Default:""
        },
        { 
            Applications:"App 2",
            Type:"Standard",
            View:"",
            Default:""
        },
        { 
            Applications:"App 3",
            Type:"Custom",
            View:"",
            Default:""
        },
        { 
            Applications:"App 4",
            Type:"Custom",
            View:"",
            Default:""
        },
    ]

    const ApplicationColumns = [

        {
            dataField:"Applications",
            text:"Applications"
        },
        {
            dataField:"Type",
            text:"Type"
        },
        
        {
            dataField: 'View',
            text: "View",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <Checkbox
                    /> 
                </div>
            }
            
        },
        {
            dataField:"Default",
            text:"Default",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <RadioButton
                    /> 
                </div>
            }

        },

    ]

    const ObjectAccessTab = [
        {
            Objects:"Object 1",
            Type:"Standard",
            FieldSettings:"Object 1 Name_Fields",
            FormTypeSettings:"Object 1 Name_Form",
            TabSettings:"Default On",
        },
        {
            Objects:"Object 2",
            Type:"Standard",
            FieldSettings:"Object 2 Name_Fields",
            FormTypeSettings:"Object 2 Name_Form",
            TabSettings:"Default On",
        },
        {
            Objects:"Object 3",
            Type:"Custom",
            FieldSettings:"Object 3 Name_Fields",
            FormTypeSettings:"Object 3 Name_Form",
            TabSettings:"Default Off",
        },
        {
            Objects:"Object 4",
            Type:"Custom",
            FieldSettings:"Object 3 Name_Fields",
            FormTypeSettings:"Object 3 Name_Form",
            TabSettings:"Hidden",
        },
    ]

    const [ObjectAccessColumns] = useState([

        {
            dataField:"Objects",
            text:"Objects"
        },
        {
            dataField:"Type",
            text:"Type"
        },
        {
            dataField:"FieldSettings",
            text:"Field Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text={row.FieldSettings}
                    type="button"
                    id="editButton"
                    // onClick={() => row && row.custom ?
                    //     props.history.push(`/setup/object/edit/${row._id}`) :
                    //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    // }
                   onClick={()=>props.history.push(`/setup/FieldAccess`)}
                /> 
                
                </div>
            }


        },
        {
            dataField:"FormTypeSettings",
            text:"Form Type Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text={row.FormTypeSettings}
                    type="button"
                    id="editButton"
                    onClick={
                        // ()=>props.history.push(`/setup/FieldAccess`)
                        ()=>props.history.push(`/setup/FormType`)
                    }
                /> 
                
                </div>
            }
        },

        {
            dataField:"TabSettings",
            text:"Tab Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap dropdown-full-w">
                    <Dropdown
                    options={TabSettingsoptions}
                    maxMenuHeight={200} 
                    value={TabSetting.TabSettings}
                    onChange={(e) => handleSelectChange(e, "TabSettings")}
                    className="searchSelect"  
                       name="TabSettings"
                    />
                </div>
            }

        },
        
        {
            dataField: 'BasicDataAccessSettings',
            text: "Basic Data Access Settings",
            formatter: (cell, row) => {
                console.log('row>>>>>>>',row,'disabled>>>>>>>>>',disabled)
                return (<div className="inlineBtnWrap">
                   
                    <Checkbox                   
                    disabled={true}
                    label="Create"
                    //checked="checked"
                    /> 
                     <Checkbox
                     disabled={true}
                    label="Read"
                   //checked="checked"
                    /> 
                    <Checkbox
                     disabled={true}
                    label="Update"
                    // checked="checked"
                    /> 
                     <Checkbox
                     disabled={true}
                    label="Delete"
                    // checked="checked"
                    /> 
                </div>)
            
            }
            
        },
       
        {
            dataField:"Action",
            text:"Action",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text="Edit"
                    type="button"
                    id="editButton"
                    // onClick={() => row && row.custom ?
                    //     props.history.push(`/setup/object/edit/${row._id}`) :
                    //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    // }
                    onClick={()=>handleEditBasicDataAccess()}
                /> <span className="actionSeperator">|</span>
                <CustomButton
                    variant="link"
                    text="Delete"
                    type="button"
                    id="deleteButton"
                    // onClick={() => handleDelete(row._id)}
                />
                </div>
            }

        },

    ]
    );

    const [ObjectAccessColumnsClone] = useState([

        {
            dataField:"Objects",
            text:"Objects"
        },
        {
            dataField:"Type",
            text:"Type"
        },
        {
            dataField:"FieldSettings",
            text:"Field Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text={row.FieldSettings}
                    type="button"
                    id="editButton"
                    // onClick={() => row && row.custom ?
                    //     props.history.push(`/setup/object/edit/${row._id}`) :
                    //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    // }
                   onClick={()=>props.history.push(`/setup/FieldAccess`)}
                /> 
                
                </div>
            }


        },
        {
            dataField:"FormTypeSettings",
            text:"Form Type Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text={row.FormTypeSettings}
                    type="button"
                    id="editButton"
                    onClick={
                        // ()=>props.history.push(`/setup/FieldAccess`)
                        ()=>props.history.push(`/setup/FormType`)
                    }
                /> 
                
                </div>
            }
        },

        {
            dataField:"TabSettings",
            text:"Tab Settings",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap dropdown-full-w">
                    <Dropdown
                    options={TabSettingsoptions}
                    maxMenuHeight={200} 
                    value={TabSetting.TabSettings}
                    onChange={(e) => handleSelectChange(e, "TabSettings")}
                    className="searchSelect"  
                       name="TabSettings"
                    />
                </div>
            }

        },
        
        {
            dataField: 'BasicDataAccessSettings',
            text: "Basic Data Access Settings",
            formatter: (cell, row) => {
                console.log('row>>>>>>>',row,'disabled>>>>>>>>>',disabled)
                return (<div className="inlineBtnWrap">
                   
                    <Checkbox          
                    label="Create"
                    desabled={false}
                    //checked="checked"
                    /> 
                     <Checkbox
                    label="Read"
                    desabled={false}
                   //checked="checked"
                    /> 
                    <Checkbox
                    label="Update"
                    desabled={false}
                    // checked="checked"
                    /> 
                     <Checkbox
                    label="Delete"
                    desabled={false}
                    // checked="checked"
                    /> 
                </div>)
            
            }
            
        },
       
        {
            dataField:"Action",
            text:"Action",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                    variant="link"
                    text="Edit"
                    type="button"
                    id="editButton"
                    // onClick={() => row && row.custom ?
                    //     props.history.push(`/setup/object/edit/${row._id}`) :
                    //     props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    // }
                    onClick={()=>handleEditBasicDataAccess()}
                /> <span className="actionSeperator">|</span>
                <CustomButton
                    variant="link"
                    text="Delete"
                    type="button"
                    id="deleteButton"
                    // onClick={() => handleDelete(row._id)}
                />
                </div>
            }

        },

    ]);

 const handleEditBasicDataAccess = () =>{
     setDisabled(!disabled)
     setDisabled((prev)=>{
         return !prev
     })
    //  alert(!disabled)
    // CustomButton.Clicked===true?setDisabled(false):setDisabled(true) 
}


    const TabSettingsoptions=[
        { value: "text", label: "Default On", color: "#f0f" },
        { value: "text", label: "Default Off", color: "#f0f" },
        { value: "text", label: "Hiddden", color: "#f0f" },
    ]


    return(
        <>
        {/* {JSON.stringify(disabled)} */}
        <Container fluid>
        <Row className="header_createeditobject row align-items-center">
            <Col xs={4}>
               <b>Profile :</b>&nbsp;<span className="heading_CreateEditObject">Sales Profile</span>
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
            <Row >
                
            <Col xs={3}></Col>
                    
                <Col xs={6} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {/* <CustomButton
                    text="Profile Extensions"
                    variant="dark"
                    onClick={() => props.history.push(`/setup/ExtensionGroups`)}
                    type="button"
                    /> */}

                <CustomButton
                    text="Extension Groups"
                    variant="dark"
                    onClick={() => props.history.push(`/setup/ExtensionGroups`)}
                    type="button"
                    className="btn-blue mr-2 ml-2"
                    />

               

                <CustomButton
                    text="Profile Users"
                    variant="dark"
                    // onClick={() => props.history.push(`/setup/ProfileExtension`)}
                    type="button"
                    className="btn-blue mr-2 ml-2"
                    />
                    
               
                </Col>
                <Col xs={3}></Col>
            </Row>
            <Row  className="recordViewMain mt-4 ml-1" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Tabs defaultActiveKey="BasicInfo" id="BasicInfo" className="mb-4">
                  <Tab eventKey="BasicInfo" title="Basic Info">
                    <div>
                      {
                        <BasicInfo/>
                      }
                    </div>
                  </Tab>

                  <Tab eventKey="ProfileExtensions" title="Profile Extensions">
                    {/* <Container> */}
                      {
                        <ProfileExtensions/>
                      }
                     
                    {/* </Container> */}
                  </Tab>  
                  
                  <Tab eventKey="ApplicationAccess" title="Application Access">
                  <div>
                      {
                         <ApplicationAccess 

                           columns={ApplicationColumns}
                           data={ApplicationAccessTab}

                         />
                      }
                    </div>
                  </Tab>


                        
                  <Tab eventKey="ObjectAccess" title="Object Access">
                    <div>
                      {
                        <ObjectAccess 

                        columns={disabled == true ? ObjectAccessColumns : ObjectAccessColumnsClone}
                        data={ObjectAccessTab}
                        className="ObjectAccessCustom"
                        
                        />
                      }
                    </div>
                  </Tab>

                  <Tab eventKey="SystemSettings" title="System Settings">
                  <div>
                      {
                         'Hello System Settings'
                      }
                     
                    </div>
                  </Tab>

                  <Tab eventKey="AdminSettings" title="Admin Settings">
                  <div>
                      {
                        "Hello Admin Settings"
                      }
                  </div> 
                  </Tab>
                        
                </Tabs>
            </Row>
        </Container>
        </>
    )
}

export default View