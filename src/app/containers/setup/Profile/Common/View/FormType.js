import React from 'react';
import DataTable from '../../../../../components/common/dataTable/DataTable';
import Checkbox from '../../../../../components/atom/Checkbox';
import RadioButton from '../../../../../components/atom/Radio';
import CustomButton from '../../../../../components/atom/Button'
import { useHistory } from "react-router-dom";

const FormType =props=>{

    const history = useHistory();

    const FormTypeTab = [
        {
            FormType:"Deafult Form",
            FormLayoutAssigned:"Accout Default Layout",
        },
        {
            FormType:"Form 1",
            FormLayoutAssigned:"Custom Layout 1",
        },
        {
            FormType:"Form 2",
            FormLayoutAssigned:"Custom Layout 2",
        },
    ]
    
        const FormTypeColumns = [
            {
                dataField:"FormType",
                text:"Form Type" 
            },
            {
                dataField:"FormLayoutAssigned",
                text:"Form Layout Assigned" 
            },
            {
                dataField:"Access",
                text:"Access",
                formatter: (cell, row) => {
                    return <div className="inlineBtnWrap">
                       <Checkbox
                       
                        /> 
                         
                    </div>
                }
    
            },
            {
                dataField:"Default Assignment",
                text:"Default Assignment",
                formatter: (cell, row) => {
                    return <div className="inlineBtnWrap">
                       <RadioButton
                        /> 
                         
                    </div>
                }
    
            },
        ]
    

    return(
        <>
        <div className="admin-settings">
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
      columns={FormTypeColumns}
      data={FormTypeTab}
    />
    </div>
        </>
    )
}

export default FormType