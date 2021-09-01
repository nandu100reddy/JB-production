export const sidebarArray = [
    {
        label: "MANAGE USERS",
        isExpand: false,
        isSearch: false,
        children: [
            {
                label: "Profiles",
                ref: "Field1",
                routerLink: "/setup/profiles"
            },
            {
                label: "Permissions",
                ref: "Field2",
                routerLink: "/setup/permissions"
            },
            {
                label: "Roles",
                ref: "Field3",
                routerLink: "/setup/roles"
            },
            {
                label: "Users Information",
                ref: "Field4",
                routerLink: "/setup/userInformation"
            },
            {
                label: "Groups",
                ref: "Field4",
                routerLink: "/setup/groups"
            },
            {
                label: "Queues",
                ref: "Field4",
                routerLink: "/setup/queues"
            },
            {
                label: "Login History",
                ref: "Field4",
                routerLink: "/setup/loginHistory"
            }
        ]
    },
    {
        label: "ORGANIZATION SETUP",
        isExpand: false,
        isSearch: false,
        children: [
            {
                label: "Org. Information",
                ref: "Field1",
                routerLink: "/setup/orgInformation"
            },
            {
                label: "Fiscal Year",
                ref: "Field2",
                routerLink: "/setup/fiscalYear"
            },
            {
                label: "Business Hours",
                ref: "Field3",
                routerLink: "/setup/businessHours"
            }
        ]
    },
    {
        label: "HOME PAGE",
        isExpand: false,
        isSearch: false,
        children: [
            {
                label: "Home Page Components",
                ref: "RelatedSection1",
                routerLink: "/setup/homepageComponents"
            },
            {
                label: "Home Page Layout",
                ref: "RelatedSection2",
                routerLink: "/setup/homepageLayout"
            }
        ]
    },
    {
        label: "OBJECT LEVEL ACTIONS",
        isExpand: false,
        isSearch: true,
        children: []
    },
    {
        label: "CONFIGURATION",
        isExpand: false,
        routerLink: "",
        children: [
            {
                label: "Application",
                ref: "RelatedSection1",
                routerLink: "/setup/applications"
            },
            {
                label: "Object Names",
                ref: "RelatedSection2",
                routerLink: "/setup/objects"
            },
            {
                label: "Tab Menu",
                ref: "RelatedSection2",
                routerLink: "/setup/tabMenus"
            },
            {
                label: "Workflows",
                ref: "RelatedSection2",
                routerLink: "/setup/workflows"
            },
            {
                label: "Approvals",
                ref: "RelatedSection2",
                routerLink: "/setup/approvals"
            }
        ]
    },
    {
        label: "DEVELOPMENT",
        isExpand: false,
        isSearch: false,
        routerLink: "",
        children: [
            {
                label: "Classes",
                ref: "RelatedSection1",
                routerLink: "/setup/classes"
            },
            {
                label: "Triggers",
                ref: "RelatedSection2",
                routerLink: "/setup/triggers"
            },
            {
                label: "Task Execution",
                ref: "RelatedSection2",
                routerLink: "/setup/taskExecution"
            },
            {
                label: "Settings",
                ref: "RelatedSection2",
                routerLink: "/setup/settings"
            },
            {
                label: "Api",
                ref: "RelatedSection2",
                routerLink: "/setup/api"
            },
            {
                label: "React Components",
                ref: "RelatedSection2",
                routerLink: "/setup/reactComponents"
            }
        ]
    }
]