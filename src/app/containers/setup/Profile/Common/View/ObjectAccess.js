import React from 'react';
import DataTable from '../../../../../components/common/dataTable/DataTable';


const ObjectAccess =props=>{
    
    return(
        <>
         
       <DataTable  
      keyField="text"
      columns={props.columns}
      data={props.data}
    />
        </>
    )
}

export default ObjectAccess