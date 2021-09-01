import React from 'react';
import DataTable from '../../../../../components/common/dataTable/DataTable';
import Checkbox from '../../../../../components/atom/Checkbox';
import CustomButton from '../../../../../components/atom/Button';
import { useHistory } from "react-router-dom";

const FieldAccess =props=>{

    const history = useHistory();

    const FieldAccessTab = [
        {
            FieldName:"Field 1",
            FieldDisplayName:"Field 1",
            FieldDataType:"Text",
            Type:"Standard"
        },
        {
            FieldName:"Field 2",
            FieldDisplayName:"Field 2",
            FieldDataType:"Number",
            Type:"Standard"
        },
        {
            FieldName:"Field 3",
            FieldDisplayName:"Field 3",
            FieldDataType:"Text Area",
            Type:"Standard"
        },
        {
            FieldName:"Field 4",
            FieldDisplayName:"Field 4",
            FieldDataType:"Phone",
            Type:"Standard"
        },
        {
            FieldName:"Field 5",
            FieldDisplayName:"Field 5",
            FieldDataType:"Email",
            Type:"Custom"
        },
        {
            FieldName:"Field 6",
            FieldDisplayName:"Field 6",
            FieldDataType:"URL",
            Type:"Custom"
        },
        {
            FieldName:"Field 7",
            FieldDisplayName:"Field 7",
            FieldDataType:"Text",
            Type:"Custom"
        },
        {
            FieldName:"Field 8",
            FieldDisplayName:"Field 8",
            FieldDataType:"Number",
            Type:"Custom"
        },
        {
            FieldName:"Field 9",
            FieldDisplayName:"Field 9",
            FieldDataType:"Text",
            Type:"Custom"
        },
        {
            FieldName:"Field 10",
            FieldDisplayName:"Field 10",
            FieldDataType:"Number",
            Type:"Custom"
        },
    ]

    const FieldAccessColumns = [
        {
            dataField:"FieldName",
            text:"Field Name" 
        },
        {
            dataField:"FieldDisplayName",
            text:"Field Display Name" 
        },
        {
            dataField:"FieldDataType",
            text:"Field Data Type" 
        },
        {
            dataField:"Type",
            text:"Type" 
        },
        {
            dataField:"ReadAccess",
            text:"Read Access",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                   <Checkbox
                    
                    />  
                </div>
            }

        },
        {
            dataField:"UpdateAccess",
            text:"Update Access",
            formatter: (cell, row) => {
                return <div className="inlineBtnWrap">
                   <Checkbox
                   
                    /> 
                     
                </div>
            }

        },
    ]


    return(
        <>
      
        <div className="sys-setting-tab">
        <CustomButton
                variant="dark" 
                text="Back"
                type="button"
                className="ml-2"
                id="back"
                onClick={() => history.goBack()}
                />

       <DataTable  
      keyField="text"
      columns={FieldAccessColumns}
      data={FieldAccessTab}
    />
    </div>
        </>
    )
}

export default FieldAccess