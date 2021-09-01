import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Container, Nav } from 'react-bootstrap';
import { FaSortDown } from 'react-icons/fa';


const HeaderSetup = props => {
  const { handleOnSelect, activeMenuItem, setupMenuItem } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * handleMenuOpen - function is use for Open/Close menu dropdown that is more then 7 
   */
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  /**
   * renderMenuItem - function is call for render menu item according to the menu json and provided Params
   * @param {number} indexValue  
   * @param {string} condition - lessThen/greaterThen
   * @return {array} lessThenMenu/greaterThenMenu
   */
  const renderMenuItem = (indexValue, condition) => {
    switch (condition) {
      case "lessThen":
        let lessThenMenu = setupMenuItem.map((menuItem, index) => {
          if (index < indexValue) {
            return <Nav.Item key={menuItem._id}>
              <Nav.Link exact as={NavLink} to={`/setup/${menuItem._id}/objects`} eventKey={menuItem._id} >
                {menuItem.icon && <img src={menuItem.icon} alt={menuItem.label} />}
                {
                  menuItem.label
                }
              </Nav.Link>
            </Nav.Item>
          }
        })
        return lessThenMenu;
      case "greaterThen":
        let greaterThenMenu = setupMenuItem.map((menuItem, index) => {
          if (index > indexValue) {
            return <Nav.Item key={menuItem._id} onClick={handleMenuOpen}>
              <Nav.Link exact as={NavLink} to={`/setup/${menuItem._id}/objects`} eventKey={menuItem._id} >
                {menuItem.icon && <img src={menuItem.icon} alt={menuItem.label} />}
                {
                  menuItem.label
                }
              </Nav.Link>
            </Nav.Item>
          }
        })
        return greaterThenMenu;
    }
  }
  return (
    <>
      <header className="headerSetup">
        <Container fluid>
          <Row>
            <Col sm={2} className="SetupLogo pl-1 pr-0">
              <NavLink to="/">
                <img
                  src="http://jbwork.in/jbplatform-images/images/JBPlatformlogoFinal.png"
                  alt="setup Logo"
                /></NavLink>
              <h1 className="AdminSetupText"> Admin Setup</h1>
            </Col>
            <Col sm={10}>
              <Nav
                activeKey={activeMenuItem}
                onSelect={(selectedKey) => handleOnSelect(selectedKey)}
                className="nav-setup"
              >
                <Nav.Item key="setupHome">
                  <Nav.Link exact as={NavLink} to="/setup" eventKey="setupHome" >
                    <img src="https://img.icons8.com/home" alt="Home" /> Home
                  </Nav.Link>
                </Nav.Item>
                {
                  // function renderMenuItem call for lessThen 6 items
                  renderMenuItem(7, "lessThen")
                }
                {
                  setupMenuItem.length > 7 ?
                    <div className={menuOpen ? "menuDropdown menuOpen" : 'menuDropdown'}>
                      <div className="menuOpenIcon" onClick={handleMenuOpen}><FaSortDown /></div>
                      <div className="menuDropdownItem" >
                        {
                          // function renderMenuItem call for greater then 6 items- create DropDown in Menu
                          renderMenuItem(7, "greaterThen")
                        }
                      </div>
                    </div> : null
                }

              </Nav>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  )

}

export default HeaderSetup;