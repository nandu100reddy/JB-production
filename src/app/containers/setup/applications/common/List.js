import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadApplications } from '../../../../../core/actions/Applications.action';
import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../../../../components/atom/Button';
import DataTable from '../../../../components/common/dataTable/DataTable';



const List = props => {
    const [applications, setApplications] = useState([])

    // Use effect Life Cycle Hooks - ComponentDidMount
    useEffect(() => {
        getApplications();
    }, []);

    const getApplications = async () => {
        props.loadApplications().then(response => {
            if (response && response.status === 200) {
                const { data, data: { result, result: { applications, standardApplications } } } = response;
                if (data.statusCode === 1) {
                    const newApplications = [...standardApplications, ...applications,]
                    setApplications(newApplications);
                } else {
                    alert("Api Error : " + result.message);
                }
            } else {
                console.log(response.status)
            }
        });
    }
    const handleDeleteApplication = (id) => {

    }


    // Define Columns Object list 
    const columns = [
        {
            dataField: 'name',
            text: "Application Name",
            hidden: true
        },
        {
            dataField: 'name',
            text: "Application Name",
            formatter: (cell, row) => <CustomButton
                variant="link"
                text={row.name}
                type="button"
                id="viewButton"
                onClick={() => props.history.push(`/setup/${row.name.replace(/\s/g, '')}/view/${row._id}`)}
            />
        },
        {
            dataField: 'label',
            text: "Display Name",
        },
        {
            dataField: 'plural_label',
            text: "Plural Label",
        },
        {
            dataField: 'created_by_id',
            text: "Created By",
        },
        {
            dataField: 'last_modified_by_id',
            text: "Last Modified By",
        },
        {
            dataField: '',
            text: "Actions",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                    <CustomButton
                        variant="link"
                        text="Edit"
                        type="button"
                        id="editButton"
                        onClick={() => props.history.push(`/setup/${row.name.replace(/\s/g, '')}/edit/${row._id}`)}
                    />
                    <CustomButton
                        variant="link"
                        text="Delete"
                        type="button"
                        id="deleteButton"
                        onClick={() => handleDeleteApplication(row._id)}
                    />
                </div>
            }
        },
    ]
    return (
        <Container fluid>
            <Row className="header_createeditobject">
                <Col sm={6}>
                    <span className="heading_eachline">Application Items</span>
                    <span className="subheading_eachline" style={{ display: "flex" }}>Create/Edit the Application items</span>
                    <span class="verysmall_text_objectList">{applications.length} Applications Items</span>
                </Col>
                <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }} className="pt-3" >
                    <CustomButton
                        variant="dark"
                        text="New Application"
                        type="submit"
                        id="newApplication"
                        onClick={() => props.history.push(`/setup/application/create`)}
                    />
                </Col>
            </Row>
            <Row xs={1} style={{ marginTop: "1%" }}>
                <Col>
                    <DataTable
                        keyField="_id"
                        defaultSortField="_id"
                        data={applications}
                        columns={columns}
                        csvName={false}
                    />
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        applications: state.application.applications
    }
};

const mapDispatchToAction = (dispatch) => {
    return bindActionCreators({
        loadApplications
    },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(List));