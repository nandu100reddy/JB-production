import React from "react"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationTotalStandalone,
    PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Row, Col } from 'react-bootstrap';
import Scrollbar from 'react-scrollbars-custom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { FaFileExport } from 'react-icons/fa'

const DataTable = props => {
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport
    const { data, columns, defaultSortField, keyField, csvName, message, showSearch = true, showPagination = true,
        totalSize, page, cellEditable, rowClasses, searchCount, sortOrder, sizePerPage, remote, pageProps, selectRow,
        beforeSaveCell,
        className,
        ...tableProps
    } = props;
    const customTotal = (from, to, size, total) => {
        if (data.length > 0) {
            if (remote) {
                return searchCount ? (
                    <span className="react-bootstrap-table-pagination-total">
                        {`Showing ${from} to ${to} of ${searchCount} entries`}
                        {totalSize !== searchCount && `(filtered from ${totalSize}) total entries)`}
                    </span>
                ) : null;
            } else {
                return (
                    <span className="react-bootstrap-table-pagination-total">
                        {`Showing ${from} to ${to} of ${size} entries`}
                        {data.length !== size && `(filtered from ${data.length}) total entries)`}
                    </span>
                );
            }
        } else {
            return false;
        }
    }
    const onTableChange = (type, option) => {
        const { loadData } = props;
        loadData(options)
    }

    /**
     * Define Default option object for data table
     */

    const options = {
        custom: true,
        alwaysShowAllBtns: true,
        withFirstAndLast: false,
        prePageText: "Prev",
        nextPageText: "Next",
        prePageTitle: "Prev Page",
        nextPageTitle: "Next Page",
        showTotal: data && data.length > 0,
        paginationTotalRenderer: customTotal,
        totalSize: searchCount || data.length,
        page,
        ...pageProps,
        sizePerPageList: sizePerPage ? sizePerPage : [25, 30, 50, 100]
    }

    const defaultSorted = defaultSortField ? [{
        dataField: defaultSortField,
        order: sortOrder ? sortOrder : "desc"
    }] : [];

    const remoteProps = remote ? { onTableChange } : {};
    const cellEdit = cellEditable && cellEditFactory({
        mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: beforeSaveCell
    });
    const table = (toolKitProps, paginationTableProps) => (
        <BootstrapTable
            headerClasses="tablePositionRow"
            noDataIndication="Data Not Found"
            wrapperClasses="table-responsive"
            defaultSorted={defaultSorted}
            cellEdit={cellEdit}
            rowClasses={rowClasses}
            filter={filterFactory()}
            remote={remote}
            {...toolKitProps.baseProps}
            {...paginationTableProps}
            {...remoteProps}
            striped
            hover
            condensed
            selectRow={selectRow}
            className={className}
        />
    )


    return (
        <ToolkitProvider
            data={Array.isArray(data) ? data : []}
            columns={columns}
            search={{ searchFormatted: true }}
            keyField={keyField}
            bootstrap4
            {...tableProps}
            exportCSV={{
                fileName: `${csvName}.csv`,
                blobType: 'text/csv:charset=ansi',
                onlyExportFiltered: true,
                exportAll: false
            }}
        >
            {
                toolKitProps => (<>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {({ paginationProps, paginationTableProps }) => (
                            <div className="dataTable-wrap">
                                <Row>
                                    {
                                        showPagination &&
                                        <Col xs={3} className="align-items-center d-flex pr-0 mt-minus-38">
                                            <label className="mt-1">Show</label>
                                            <SizePerPageDropdownStandalone
                                                {...paginationProps}
                                                className="mx-1"
                                            />
                                            <label className="mt-1">entries</label>
                                        </Col>
                                    }
                                    {
                                        showSearch &&
                                        <Col xs={6} className="align-items-center d-flex pr-0 mt-minus-38">
                                            <SearchBar {...toolKitProps.searchProps} />&nbsp;
                                            <ClearSearchButton {...toolKitProps.searchProps} className="btn btn-primary RecordSearchButton" />
                                        </Col>
                                    }
                                    <Col xs={12} className="table-wrap-row mt-2">
                                        <div className="table-wrap custom_table_wrap">
                                            <Scrollbar
                                                translateContentSizesToHolder
                                                disableTracksWidthCompensation
                                             > 
                                                {table(toolKitProps, paginationTableProps)}
                                            </Scrollbar> 
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    showPagination &&
                                    <Row className="mt-3">
                                        <Col xs={5} className="pt-1">
                                            <PaginationTotalStandalone {...paginationProps} />
                                        </Col>
                                        <Col className="text-right">
                                            <PaginationListStandalone {...paginationProps} />
                                        </Col>
                                    </Row>
                                }
                            </div>
                        )}
                    </PaginationProvider>
                    {
                        csvName === false ? null :
                            <Row>
                                <Col className="mt-2">
                                    <ExportCSVButton {...toolKitProps.csvProps}>
                                        Export CSV <FaFileExport />
                                    </ExportCSVButton>
                                </Col>
                            </Row>
                    }
                </>)
            }
        </ToolkitProvider>
    );
};

DataTable.defaultProps = {
    data: [],
    remote: false,
    sortOrder: "desc",
    sizePerPage: [25, 30, 50, 100],
    page: 1,
    csvName: false
}


export default DataTable;