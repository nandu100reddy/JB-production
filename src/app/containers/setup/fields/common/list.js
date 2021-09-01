import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../../../components/atom/Input';
import CustomButton from '../../../../components/atom/Button';
import Checkbox from '../../../../components/atom/Checkbox';
import DataTable from '../../../../components/common/dataTable/DataTable';
import { loadFields } from '../../../../../core/actions/Fields.action'
import { dataTable } from '../../objects/utils/constants';

const List = props => {
    const { activeApplication, match: { params: { objectId, id } } } = props;
    const [getList, setList] = useState([])
    const [getTempList, setTempList] = useState([])

    const [FieldsList, setFieldList] = useState([])


    const [getSearchField, setSearchField] = useState('')

    //  TableTab is a static json.You can use this json for learning purpose
    /*const TableTab = [
        {
            FieldDisplayName:"Name",
            FieldName: "Name",
            dataType: "Name",
            controllingFields: "",
            indexed: "checkbox",   
        },
        {
            FieldDisplayName: "Account Number",
            FieldName: "AccountNumber",
            dataType: "Text(40)",
            controllingFields: "",
            indexed: "",
        },
        {
            FieldDisplayName: "Account Owner",
            FieldName: "OwnerID",
            dataType: "Lookup(User)",
            controllingFields: "",
            indexed: "",    
        },

        {
            FieldDisplayName: "Account Record Type",
            FieldName: "RecordTypeId",
            dataType: "Record Type",
            controllingFields: "",
            indexed: "checkbox",    
        },
        {
            FieldDisplayName: "Account Site",
            FieldName: "Site",
            dataType: "Text(80)",
            controllingFields: "",
            indexed: "",  
        },

        {
            FieldDisplayName: "Description",
            FieldName: "Description",
            dataType: "Long Text Area(32000)",
            controllingFields: "",
            indexed: "",    
        },
        {
            FieldDisplayName: "Custom Field 1",
            FieldName: "CustomField__c",
            dataType: "picklist",
            controllingFields: "",
            indexed: "checkbox",
        }
    ]
    */

    const columns = [
        {
            dataField: 'label',
            text: "Field Display Name",
        },

        {
            dataField: 'name',
            text: "Field Name",
        },
        {
            dataField: 'type',
            text: "Data Type",
        },
        {
            dataField: 'controllingFields',
            text: "Controlling Fields",
        },

        {
            dataField: 'indexed',
            text: "Indexed",
        },
        {
            dataField: 'action',
            text: "Action",
            sort: true,
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

    // const fetchTableTab = () => {
    //     setList(TableTab)
    //     setTempList(TableTab)
    // }

    useEffect(() => {
        getFields();
        loadFields();
    }, [])



    const getFields = () => {
        var arr = []
        props.loadFields()
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result, result: { fields, standardFields } } } = response;
                    if (data.statusCode === 1) {
                        //{console.log('statusCode>>>',data.statusCode,data.result)}
                        // const allFields = [...fields, ...standardFields];
                        //setFieldList([...data.result]);

                        data.result.map((item, index) => {
                            //console.log("MMLLLLLLLLLL",item)
                            item['type'] = item.type + "(" + item.length + ")"
                            arr.push(item)
                        })
                        setFieldList(arr)
                        //console.log("CHeck",arr)
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }

    const handleDeleteField = (id) => {

    }



    const handleClick = () => {

        var tempArr = []
        getTempList.map(item => {
            const srchData = item.FieldDisplayName.toLowerCase()
            if (srchData.includes(getSearchField.toLowerCase())) {
                tempArr.push(item)
            }

        })
        setList(tempArr)
    }

    const handleBlur = () => {

    }


    const handleFieldHistoryTracking = () => {
        alert("handleFieldHistoryTracking")
    }
    return (
        <Container fluid>
            <Row className="header_createeditobject row align-items-center">
                <Col sm={4}><span className="heading_eachline">Fields :</span><span className="heading_CreateEditObject">Contact Object</span><span style={{ display: "flex" }} >Create/Edit the Object Fields</span><span style={{ fontSize: "12px", color: "#636e72" }} >{FieldsList.length}+ Fields Found</span>
                </Col>

                <Col sm={4} style={{ display: "flex" }}><div className="search_btn_listfield">
                    <Input
                        onChange={(name, value, id) => setSearchField(value)}
                        className="search_List_Input"
                        type="text"
                        id="searchBar"
                        label=""
                        value=""
                        onBlur={handleBlur}
                        error=""
                        require=""

                    />
                    <CustomButton
                        onClick={() => handleClick()}
                        variant="dark"
                        text="Search"
                        type="submit"
                        id="field_Search"
                        className="search_btn_list"
                    />
                </div>
                </Col>

                <Col sm={4} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" ><div className="fieldhistory_list" >

                    <CustomButton
                        variant="dark"
                        text="Create Field"
                        type="button"
                        className="mr-2"
                        id="createField"
                        onClick={() => props.history.push(`/setup/${objectId}/field/create`)}
                    />
                    <CustomButton
                        variant="dark"
                        text="Field History Tracking"
                        type="submit"
                        id="FieldHistoryTracking"
                        // disabled={!isValidate}
                        onClick={handleFieldHistoryTracking}
                    />
                </div>
                </Col>
            </Row>

            {FieldsList.length != 0 ? <div style={{ border: "2px solid #e6e6e6" }}>

                <DataTable
                    keyField="text"
                    columns={columns}
                    data={FieldsList}
                />
            </div> : <></>}
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        // FieldsList: state.FieldsList.FieldsList
    }
};

/* 
Note:(state.FieldsList.FieldsList) FieldsList b/w state & FieldsList i don't know exactly it came from.Plz correct it.I have just completed core redux task
**/

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        loadFields
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(List));