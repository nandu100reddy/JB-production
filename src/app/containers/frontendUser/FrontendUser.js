import React, { useState, useEffect } from 'react';
import Header from '../../components/common/header/Header';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadApplications, loadObjectByApplicationId } from '../../../core/actions/Applications.action';
import Create from './record/common/Create';
import Records from './record/Records';
import View from './record/common/View';
import Chat from './chat/Chat';


const FrontendUser = props => {
  const [activeMenuItem, setActiveMenuItem] = useState();
  const [menuObject, setMenuObject] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeApplication, setActiveApplication] = useState({});
  const [applicationsList, setApplicationsList] = useState([]);

  // Use effect Life Cycle Hooks - ComponentDidMount
  useEffect(async () => {
    await getApplications();
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
          setActiveApplication(standardApplications[0])
          setApplicationsList(newApplications);
          if (standardApplications[0])
            getObjectByApplicationId(standardApplications[0]);
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
  const getObjectByApplicationId = (activeApplication) => {
    props.loadObjectByApplicationId(activeApplication._id).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result, result: { objects } } } = response;
        if (data.statusCode === 1) {
          setMenuObject(objects);
          setActiveMenuItem(objects[0]._id);
          //props.history.push(`/user/${activeApplication._id}/${objects[0]._id}`)
        } else {
          alert("Api Error : " + result.message);
          setMenuObject([]);
          setActiveMenuItem('');
          props.history.push('/user');
        }
      } else {
        console.log(response.status);
      }
    });
  }


  /**
   * handleOnSelect = callback function - pass in HeaderSetup component for onSelect function of Navigation
   * @param {string} selectedKey  - EventKey of Nav.Link
   */
  const handleOnSelect = (selectedKey) => {
    setActiveMenuItem(selectedKey)
  }

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }
  const handleApplicationSearch = () => {
    setSearchOpen(!searchOpen);
  }


  /**
   * function use for set selected application in dropdown 
   * @param {String} e -event
   */
  const handleApplicationSelect = (e) => {
    const selectedApplication = JSON.parse(e);
    getObjectByApplicationId(selectedApplication);
    setActiveApplication(selectedApplication);

  }


  return (
    <>
      <div className="home-wrapper">
        <Header menuOpen={menuOpen} menuObject={menuObject} handleMenuOpen={handleMenuOpen}
          activeApplication={activeApplication} applicationsList={applicationsList}
          activeMenuItem={activeMenuItem} handleOnSelect={handleOnSelect}
          handleApplicationSelect={handleApplicationSelect}
          handleApplicationSearch={handleApplicationSearch}
          searchOpen={searchOpen}
        />
        <div className="main">
          {
            menuObject.map(object => activeApplication.label === "Chat" ?
              <>
                <Route exact path={`/user/${activeApplication._id}/${object._id}`}
                  render={(props) => <Chat activeApplication={activeApplication} currentObject={object} />} />
              </> :
              <>
                <Route exact path={`/user/${activeApplication._id}/${object._id}`}
                  render={(props) => <Records activeApplication={activeApplication} currentObject={object} />} />
                <Route exact path={`/user/${activeApplication._id}/${object._id}/record/create`}
                  render={(props) => <Create activeApplication={activeApplication} currentObject={object} />} />
                <Route exact path={`/user/${activeApplication._id}/${object._id}/record/view/:id`}
                  render={(props) => <View activeApplication={activeApplication} currentObject={object} />} />
                <Route exact path={`/user/${activeApplication._id}/${object._id}/record/edit/:id`}
                  render={(props) => <Create activeApplication={activeApplication} currentObject={object} />} />
              </>
            )
          }

        </div>
      </div>
    </>
  )

}

const mapStateToProps = (state, ownProps) => {
  return {
    applications: state.application.applications
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    loadApplications,
    loadObjectByApplicationId
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(FrontendUser));