import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getObjects, deleteObject } from '../../../../../core/actions/Objects.action';
import { loadObjectByApplicationId } from '../../../../../core/actions/Applications.action';
import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../../../../components/atom/Button';
import DataTable from '../../../../components/common/dataTable/DataTable';
import { dataTable, formatColumns } from '../utils/constants';

const List = props => {
    const { applicationId } = props;
    const [objects, setObjects] = useState([]);
    const columns = [{
        dataField: 'name',
        text: "Name",
        sort: true,
        formatter: (cell, row) => <CustomButton
            variant="link"
            text={row.name}
            type="button"
            id="viewButton"
            onClick={() => row.custom ?
                props.history.push(`/setup/object/view/${row._id}`) :
                props.history.push(`/setup/${applicationId._id}/object/view/${row._id}`)
            }
        />
    },
    {
        dataField: 'label',
        text: "Label",
    },
    {
        dataField: 'plural_label',
        text: "Plural Label",
    },
    {
        dataField: 'description',
        text: "Description",
    },
    {
        dataField: 'custom',
        text: "Type",
        sort: true,
        formatter: (cell, row) => formatColumns.custom[cell]
    },
    {
        dataField: 'active',
        text: "Is Active",
        sort: true,
        formatter: (cell, row) => formatColumns.active[cell]
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
                    onClick={() => row && row.custom ?
                        props.history.push(`/setup/object/edit/${row._id}`) :
                        props.history.push(`/setup/${applicationId._id}/object/edit/${row._id}`)
                    }
                /> <span className="actionSeperator">|</span>
                <CustomButton
                    variant="link"
                    text="Delete"
                    type="button"
                    id="deleteButton"
                    onClick={() => handleDelete(row._id)}
                />
            </div>
        }
    }];

    useEffect(() => {
        if (applicationId && applicationId._id) {
            getObjectByApplicationId();
        } else {
            getObjects();
        }
    }, [])

    const getObjectByApplicationId = () => {
        props.loadObjectByApplicationId(applicationId._id)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result, result: { objects } } } = response;
                    if (data.statusCode === 1) {
                        setObjects(objects);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }
    const getObjects = () => {
        props.getObjects()
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result, result: { object, objectStandard } } } = response;
                    if (data.statusCode === 1) {
                        const allObjects = [...object, ...objectStandard];
                        setObjects(allObjects);
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });
    }


    const handleDelete = (id) => {
        props.deleteObject(id)
            .then(response => {
                if (response && response.status === 200) {
                    const { data, data: { result } } = response;
                    // check Application Updated success and redirect on Setup Page
                    if (data.statusCode === 1) {
                        alert("Object Delete Successfully!".replace("Object", result.name));
                        props.handleAction("list");
                    } else {
                        alert("Api Error : " + result.message);
                    }
                } else {
                    console.log(response.status)
                }
            });

    }

    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">Object Items</span>
                    <span style={{ display: "flex" }}>Create/Edit the Object items</span>
                    <span className="verysmall_text_objectList">{objects.length} Objects Items</span>
                </Col>
                <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" >
                    <CustomButton
                        variant="dark"
                        text="New Object"
                        type="submit"
                        id="newObject"
                        onClick={() => applicationId ?
                            props.history.push(`/setup/${applicationId._id}/object/create`) :
                            props.history.push(`/setup/object/create`)
                        }
                    />
                </Col>
            </Row>
            <Row xs={1} style={{ marginTop: "1%" }}>
                <Col>
                    <DataTable
                        keyField="_id"
                        defaultSortField="_id"
                        data={objects}
                        columns={columns}
                        csvName={false}
                    />
                </Col>
{/* {console.log('objectListData>>>>>',objects)} */}
            </Row>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        objects: state.objects.objects
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        getObjects,
        deleteObject,
        loadObjectByApplicationId
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(List));