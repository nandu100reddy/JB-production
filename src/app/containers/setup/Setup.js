import React, { useState, useEffect } from 'react';
import { Route, withRouter,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadApplications, loadObjectByApplicationId } from '../../../core/actions/Applications.action';

import { getObjects } from '../../../core/actions/Objects.action';
import { Row, Col, Container } from 'react-bootstrap';
import { sidebarArray } from './utils/constants';
import HeaderSetup from './common/HeaderSetup';
import Sidebar from './common/Sidebar';

// All Child route components here
import Objects from './objects/Objects';
import SetupHome from './setupHome/SetupHome';
import Applications from './applications/Applications';
import Create from './applications/common/Create';
import View from './applications/common/View';
import CreateObject from './objects/common/Create';
import ViewObject from './objects/common/View';
import CreateField from "./fields/common/Create";
import FieldList from "./fields/common/list";
import ViewField from "./fields/common/View";
import ProfileList from "./Profile/Common/List";
import ProfileView from "./Profile/Common/View";
import ExtensionGroups from './Profile/Common/View/ExtensionGroups';
import ExtensionGroupInfo from './Profile/Common/View/ExtensionGroupInfo';
import ProfileExtensions from './Profile/Common/View/ProfileExtensions';
import FieldAccess from './Profile/Common/View/FieldAccess';
import FormType from './Profile/Common/View/FormType';
import ExtensionGroupDetailedView from './Profile/Common/View/ExtensionGroupDetailedView'


const Setup = (props) => {
  const [setupMenuItem, setSetupMenuItem] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("setupHome");
  const [sideMenus, setSideMenus] = useState(sidebarArray);

  let history = useHistory();


  // Use effect Life Cycle Hooks - ComponentDidMount
  useEffect(async () => {
    await getApplications();
    await getObjects();
  }, []);

  /**
   * GetApplications - Function for get applications list
   */

  const getApplications = async () => {
    props.loadApplications().then(response => {
      if (response && response.status === 200) {
        const { data, data: { result, result: { applications, standardApplications } } } = response;
        if (data.statusCode === 1) {
          const newApplications = [...standardApplications, ...applications]
          setSetupMenuItem(newApplications);
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }

  /**
   * getObjectByApplicationId - function for get object list of particular application
   * @param {alphanumeric} id - Application Id  
   */
  const getObjectByApplicationId = (id) => {
    props.loadObjectByApplicationId(id).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;

        if (data.statusCode === 1) {
          InsertApplicationObjectInSidebar(result.objects)

        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }

  const InsertProfileViewInSidebar = () => {
    const sideMenusNew = sideMenus.map(item => {
      // if (item.label === "MANAGE USERS") {
      //   objects.map(item => {
      //     item.routerLink = ``
      //     item.children = [{
      //       label: "Fields",
      //       routerLink: `/setup/${item._id}/fields`
      //     }]
      //   })
      //   item.children = objects;
      // }
      // return item;
      console.log('item>>>>>>', item)
    })
    // setSideMenus(sideMenusNew);
  }

  const InsertApplicationObjectInSidebar = (objects) => {
    const sideMenusNew = sideMenus.map(item => {
      if (item.label === "OBJECT LEVEL ACTIONS") {
        objects.map(item => {
          item.routerLink = ``
          item.children = [{
            label: "Fields",
            routerLink: `/setup/${item._id}/fields`
          }]
        })
        item.children = objects;
      }
      return item;
    })
    setSideMenus(sideMenusNew);
  }

  /**
   * GetSidebar - Function for get Sidebar list
   */

  const getObjects = async () => {
    props.getObjects().then(response => {
      if (response && response.status === 200) {
        const { data, data: { result, result: { object, objectStandard } } } = response;
        if (data.statusCode === 1) {
          const allObjects = [...objectStandard, ...object];
          InsertApplicationObjectInSidebar(allObjects);
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }


  /**
   * handleOnSelect = callback function - pass in HeaderSetup component for onSelect function of Navigation
   * @param {string} selectedKey  - EventKey of Nav.Link
   */
  const handleOnSelect = async (selectedKey) => {
    if (selectedKey === "setupHome") {
      await getObjects();
    } else {
      await getObjectByApplicationId(selectedKey);
    }
    setActiveMenuItem(selectedKey)
  }

  return (
    <>
      <div className="setupWrapper">
        <HeaderSetup handleOnSelect={handleOnSelect} activeMenuItem={activeMenuItem} setupMenuItem={setupMenuItem} />
        <div className="setupMain">
       
          <Container fluid>
            <Row>

              {/* Setup Sidebar Columns  */}
              <Col sm={2} className="setup-sidebar pl-0 pr-0">
                <Sidebar sideMenusAjaxData={sideMenus} activeMenuItem={activeMenuItem} />
              </Col>

              {/* Setup action(List, Create, View, Update, Delete) Columns  */}
              <Col sm={10}>
              {/* <button onClick={() => history.goBack()}>Back</button> */}
                <Route exact path="/setup" component={SetupHome} />
                <Route exact path="/setup/applications" component={Applications} />

                <Route exact path="/setup/FieldAccess" component={FieldAccess} />
                <Route exact path="/setup/FormType" component={FormType} />
                <Route exact path="/setup/profiles" component={ProfileList} />
                <Route exact path="/setup/SalesUser/view/:id" component={ProfileView} />
                <Route exact path="/setup/ExtensionGroups" component={ExtensionGroups} />
                <Route exact path="/setup/ProfileExtension" component={ProfileExtensions} />
                <Route exact path="/setup/view/ExtensionGroupInfo" component={ExtensionGroupInfo} />
                <Route exact path="/setup/ExtensionGroupDetailedView" component={ExtensionGroupDetailedView} />

                <Route exact path="/setup/application/create" component={Create} />
                <Route exact path="/setup/:objectId/fields" component={FieldList} />
                <Route exact path="/setup/:objectId/field/create" component={CreateField} />
                <Route exact path="/setup/:objectId/field/view/:id" component={ViewField} />
                <Route exact path="/setup/:objectId/field/edit/:id" component={CreateField} />
                <Route exact path={`/setup/objects`} render={(props) => <Objects />} />
                <Route exact path={`/setup/object/create`} render={(props) => <CreateObject />} />
                <Route exact path={`/setup/object/view/:id`} render={(props) => <ViewObject />} />
                <Route exact path={`/setup/object/edit/:id`} render={(props) => <CreateObject />} />
                {
                  setupMenuItem.map(item => <>
                    <Route exact path={`/setup/${item.name.replace(/\s/g, '')}/view/:id`} component={View} />
                    <Route exact path={`/setup/${item.name.replace(/\s/g, '')}/edit/:id`} component={Create} />
                    <Route exact path={`/setup/${item._id}/objects`} render={(props) => <Objects applicationId={item} />} />
                    <Route exact path={`/setup/${item._id}/object/create`} render={(props) => <CreateObject applicationId={item} />} />
                    <Route exact path={`/setup/${item._id}/object/view/:id`} render={(props) => <ViewObject applicationId={item} />} />
                    <Route exact path={`/setup/${item._id}/object/edit/:id`} render={(props) => <CreateObject applicationId={item} />} />
                  </>
                  )
                }

              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )

}


const mapStateToProps = (state, ownProps) => {
  return {
    applications: state.application.applications,
    sidebar: state.layouts.sidebar
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    loadApplications,
    loadObjectByApplicationId,
    getObjects
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Setup));