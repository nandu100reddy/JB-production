import { OLYMPIC_SPORTS, OLYMPIC_COUNTRIES } from "./olympic_lists.js";

export const columnDefs = [
  {
    headerName: "Basic Information",
    children:[
      {
        headerName: "First Name",
        field: "firstName",
        cellEditor: "simpleEditor",
        checkboxSelection: true,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Phone Number",
        field: "phone",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Mobile Number",
        field: "mobile",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Email ID",
        field: "email",
        columnGroupShow:'closed',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Company",
        field: "company",
        columnGroupShow:'closed',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Website",
        field: "website",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
    ]
  },
  {
    headerName: "Contact Information",
    children:[
      {
        headerName: "Street",
        field: "country",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "City",
        field: "country",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "State",
        field: "state",
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Country",
        field: "country",
        cellEditor: "simpleEditor",
        // cellEditorParams: {
        //   options: OLYMPIC_COUNTRIES
        // }
      },
      {
        headerName: "Zip/Postal",
        field: "zip-code",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
    ]
  },
  {
    headerName: "Related Objects",
    children:[
      {
        headerName: "Contacts",
        field: "blogTitle",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      },
      {
        headerName: "Opportunity",
        field: "opportunity",
        columnGroupShow:'open',
        cellEditor: "simpleEditor",
      }
    ]
  },
   {
    headerName: "Action",
    colId: "actions",
    cellRenderer: "actionsRenderer",
    editable: false,
    filter: false,
  }
  // {
  //   headerName: "Phone Number",
  //   field: "country",
  //   cellEditor: "simpleEditor",
  //   cellEditorParams: {
  //     condition: value => OLYMPIC_SPORTS.includes(value)
  //   }
  // },
  // {
  //   headerName: "Email",
  //   field: "country",
  //   cellEditor: "simpleEditor",
  //   cellEditorParams: {
  //     condition: value => OLYMPIC_SPORTS.includes(value)
  //   }
  // },
  // {
  //   headerName: "Company",
  //   field: "country",
  //   cellEditor: "simpleEditor",
  //   cellEditorParams: {
  //     condition: value => OLYMPIC_SPORTS.includes(value)
  //   }
  // },
  // {
  //   headerName: "Mobile Number",
  //   field: "country",
  //   cellEditor: "simpleEditor",
  //   cellEditorParams: {
  //     condition: value => OLYMPIC_SPORTS.includes(value)
  //   }
  // },
  // {
  //   headerName: "Age",
  //   field: "age",
  //   editable:true,
  //   cellEditor: "simpleEditor",
  //   cellRenderer:function (params) {
  //     if (params.value !== undefined) {
  //       return params.value;
  //     } else {
  //       return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
  //     }
  //   },
  // },
  // {
  //   headerName: "Sport (Validation)",
  //   field: "country",
  //   cellEditor: "asyncValidationEditor",
  //   cellEditorParams: {
  //     condition: value => OLYMPIC_SPORTS.includes(value)
  //   }
  // },
  // {
  //   headerName: "Country (autoComplete)",
  //   field: "country",
  //   editable:true,
  //   cellEditor: "autoCompleteEditor",
  //   cellEditorParams: {
  //     options: OLYMPIC_COUNTRIES
  //   }
  // },
  // {
  //   headerName: "Date (Datepicker)",
  //   field: "date",
  //   cellEditor: "dateEditor",
  //   filter: "agDateColumnFilter",
  //   filterParams: {
  //     clearButton: true,
  //     suppressAndOrCondition: true,
  //     comparator: function(filterLocalDateAtMidnight, cellValue) {
  //       var dateAsString = cellValue;
  //       var dateParts = dateAsString.split("/");
  //       var cellDate = new Date(
  //         Number(dateParts[2]),
  //         Number(dateParts[1]) - 1,
  //         Number(dateParts[0])
  //       );
  //       if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
  //         return 0;
  //       }
  //       if (cellDate < filterLocalDateAtMidnight) {
  //         return -1;
  //       }
  //       if (cellDate > filterLocalDateAtMidnight) {
  //         return 1;
  //       }
  //     }
  //   }
  // },
  // {
  //   headerName: "Action",
  //   colId: "actions",
  //   cellRenderer: "actionsRenderer",
  //   editable: false,
  //   filter: false,
  //   minWidth: 220
  // }
];

export const defaultColDef = {
  editable: true,
  resizable: true,
  filter: true,

  // floatingFilter: true,
suppressKeyboardEvent: params => params.editing
};
