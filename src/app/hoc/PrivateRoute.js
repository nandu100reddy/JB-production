import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import React from "react";
import { connect } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)



// const checkPageAccess = (path, permittedPages) => {  
//   let isUserAuthorised = false;  
//   let url = path.replace(/\//g, "");  
//   let allowedActions = [];
//   let allowedActionsName = [];

//   // If permittedPages exists
//   if( Array.isArray(permittedPages) && permittedPages.length > 0) {    
//     isUserAuthorised = permittedPages.find(page => page.modulePageUrl === url);  
//     permittedPages.forEach(element => {      
//       // If Url exists
//       if(element.modulePageUrl === url){        
//         // If Action exists
//         if(( Array.isArray(element.actions) && element.actions.length > 0)){
//           // Prepare Action List
//           element.actions.forEach(item => {   
//             allowedActionsName.push(item.actionUrl);
//           });
//         }
//       }
//     });
//   }  
//   return {
//     isUserAuthorised,
//     allowedActionsName
//   };
// };

// const PrivateRoute = props => {  
//   const { component: Component, path, permittedPages, stateOfuser, ...rest } = props;
//   const checkAccess = checkPageAccess(path, permittedPages); 
//   //prettier-ignore
//   return <Route
//     {...rest}
//     render={props =>
//       ((checkAccess.isUserAuthorised == false || typeof checkAccess.isUserAuthorised == 'undefined') &&  stateOfuser.loginSuccess )  ? 
//       (<Redirect to={{pathname: "/un-authorised"}}/>)  : 
//       (<Component {...props} actions={checkAccess.allowedActionsName} />)
//     }
//     />
// };

// // get pages from redux Store
// const ProtectedRoute = connect(state => ({
//   permittedPages: state.getPermittedPagesReducer.permittedPages,
//   stateOfuser: state.user,
// }))(PrivateRoute);