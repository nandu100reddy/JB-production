import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecords, deleteRecord, updateRecord } from '../../../../../../core/actions/Records.action';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import DataTable from '../../../../../components/common/dataTable/DataTable';
import CustomButton from '../../../../../components/atom/Button';
import Checkbox from '../../../../../components/atom/Checkbox';
import SelectDropdown from '../../../../../components/atom/SelectDropdown';
import { alphabets } from '../../../../../_constants/constants';



const RelatedList = props => {
    const { activeApplication, currentObject, activeMenuItem } = props;
    const [recordList, setRecordList] = useState([]);
    const [activeAlphabet, setActiveAlphabet] = useState("all");
    const [columns, setColumns] = useState([
        {
            dataField: 'key',
            text: 'Sr. No.',
            sort: true
        }
    ]);
    const [records, setRecords] = useState([])
    const [selected, setSelected] = useState([]);

    /**
     * Life Cycle method - ComponentDidMount
     */
    useEffect(async () => {
        await getRecords();
    }, []);
    /**
     * getRecords -  function to fetch records list data 
     */

    const getRecords = async () => {
        props.getRecords(activeMenuItem._id, activeApplication._id).then(response => {
            if (response && response.status === 200) {
                let { data, data: { result, result: { columns } } } = response;
                if (data.statusCode === 1) {
                    const columnsArray = [
                        {
                            dataField: 'key',
                            text: 'Sr. No.',
                            sort: true
                        }
                    ];
                    const records = []
                    columns.map(column => {
                        if (column.index === 0) {
                            columnsArray.push({
                                dataField: column.field_id,
                                text: column.field && column.field.name,
                                hidden: true,
                                headerClasses: (column, colIndex) => {
                                    return 'hideColumn';
                                },
                                classes: (cell, row, rowIndex, colIndex) => {
                                    return 'hideColumn';
                                }
                            });
                            columnsArray.push({
                                dataField: "",
                                text: column.field && column.field.name,
                                sort: true,
                                headerClasses: "width-175",
                                formatter: (cell, row) => row && <CustomButton
                                    variant="link"
                                    text={row[column.field_id]}
                                    type="button"
                                    id="viewButton"
                                    onClick={() => props.history.push(`/user/${activeApplication._id}/${activeMenuItem._id}/record/view/${row._id}`)}
                                />
                            })
                            return;
                        }
                        columnsArray.push({
                            dataField: column.field_id,
                            text: column.field && column.field.name,
                            sort: true
                        })
                    })
                    columnsArray.push({
                        dataField: '',
                        text: "Actions",
                        headerClasses: "width-100",
                        formatter: (cell, row) => <DropdownButton id="dropdown-action" title="">
                            <Dropdown.Item
                                onClick={() => props.history.push(`/user/${activeApplication._id}/${activeMenuItem._id}/record/edit/${row._id}`)}
                            >Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDeleteRecord(row)} >Delete</Dropdown.Item>
                        </DropdownButton >
                    })
                    setColumns(columnsArray);
                    result.data.map((record, index) => {
                        const obj = {
                            key: index + 1,
                            _id: record._id
                        }
                        record.data.map(data => {
                            if (typeof data.data === 'object' && data.data !== null) {
                                obj[data.field_id] = data.data.label;
                                obj[data.objData] = data.data
                                return false;
                            }
                            obj[data.field_id] = data.data;
                        })
                        records.push(obj);
                    })
                    setRecords(records);
                    setRecordList(records)
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }

    /**
    * handleDeleteRecord - function use for handle delete events of record 
    */

    const handleDeleteRecord = (row) => {
        props.deleteRecord(row._id).then(response => {
            if (response && response.status === 200) {
                const { data, data: { result } } = response;
                if (data.statusCode === 1) {
                    alert("Record Deleted Successfully!");
                    getRecords();
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }

    const renderAlphabetFilterOptions = () => {
        return alphabets.map(char => <li className={char === activeAlphabet ? "active" : null} onClick={() => handleFilter(char)}>{char}</li>)
    }

    const handleFilter = (char) => {
        if (char === "all") {
            setRecords(recordList);
            setActiveAlphabet(char);
            return true;
        }
        let columnsID = columns[1].dataField;
        const recordsFilter = recordList.filter(item => item[columnsID].charAt().toLowerCase() === char.toLowerCase())
        setRecords(recordsFilter);
        setActiveAlphabet(char);
    }

    /**
     * Code start for Configure Row Selection in Data Table
     */
    /**
     * 
     * @param {*} row - Current Selected Row Object
     * @param {*} isSelect - Boolean value to check Row selected or not
     */
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

    /**
     * Code End for Configure Row Selection in Data Table
     */
    /**
    
    /**
    * Code start for Configure Cell level Edit in Data Table
    */
    const beforeSaveCell = async (oldValue, newValue, row, column, done) => {
        const updatedCellDetails = {
            application_id: activeApplication._id,
            object_id: activeMenuItem._id,
            data: [
                {
                    field_id: column.field_id,
                    data: newValue
                }
            ]
        }
        await props.updateRecord(row._id, updatedCellDetails)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Record Updated success and redirect on Setup Page
                    if (data.statusCode === 1) {
                        done(true);
                    } else {
                        done(false);
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
        return { async: true };
    }


    /**
    * Code End for Configure Cell level Edit in Data Table
    */

    return (
        <Container fluid>
            <Row style={{ backgroundColor: "#f7f7f7" }} className="p-3 mb-3 recordHead">
                <Col xs={6} className="">
                    <h3>Related {activeMenuItem.label}</h3>
                </Col>
                <Col xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <CustomButton
                        variant="dark"
                        text={"Create"}
                        type="submit"
                        className="mr-2"
                        id="createFieldSave"
                        onClick={() => props.history.push(`/user/${activeApplication._id}/${activeMenuItem._id}/record/create`)}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="dataTableMainWrap">
                    <ul className="alphabetWrap">
                        {renderAlphabetFilterOptions()}
                    </ul>
                    {/**
                     * IF CELL EDITABLE PROPS VALUE = TRUE
                     * THEN ALSO PASS CALLBACK FUNCTION BEFORE_SAVE_CELL 
                     */}
                    <DataTable
                        keyField="key"
                        defaultSortField="ProjectTable"
                        data={records}
                        columns={columns}
                        csvName={false}
                        selectRow={selectRow}
                        cellEditable={true}
                        beforeSaveCell={beforeSaveCell}
                    />
                </Col>
            </Row>
        </Container >
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        objectRecords: state.records.objectRecords
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        getRecords,
        deleteRecord,
        updateRecord
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(RelatedList));