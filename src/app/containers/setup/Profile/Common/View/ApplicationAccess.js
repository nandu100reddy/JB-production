import React from 'react';
import DataTable from '../../../../../components/common/dataTable/DataTable';


const ApplicationAccess =props=>{

    return(
        <> 
    <div className="application-bx">
    <DataTable  
      keyField="text"
      columns={props.columns}
      data={props.data}
    />
    </div>
       </>
    )
}

export default ApplicationAccess