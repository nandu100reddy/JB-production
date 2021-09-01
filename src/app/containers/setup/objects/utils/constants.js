export const formatColumns = {
    active: ['No', 'Yes'],
    custom: ['Standard', 'Custom'],
}

export const dataTable = {
    columns: [
        {
            dataField: 'name',
            text: "Name",
            sort: true,
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
        }
    ]
}