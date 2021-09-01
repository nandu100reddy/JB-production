import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Col, Row, Container, Nav, NavDropdown, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../../../assets/images/logo.png'
import { FaSortDown, FaSearch, FaCog, FaUserCircle, FaBell } from 'react-icons/fa';



const Header = props => {
  const { menuObject, handleOnSelect, handleMenuOpen, applicationsList, activeMenuItem,
    menuOpen, handleApplicationSearch, activeApplication, handleApplicationSelect,
    searchOpen } = props;
  /**
   * Function use for handle logout
   */
  const handleLogout = () => {
    localStorage.clear();
    props.history.push('/');
    window.location.reload(false);
  }
  /**
   * function use for render menu item 
   * @param {number} indexValue 
   * @param {string} condition 
   */

  const renderMenuItem = (indexValue, condition) => {
    switch (condition) {
      case "lessThen":
        let lessThenMenu = menuObject.map((menuItem, index) => {
          if (index < indexValue) {
            return <Nav.Item key={menuItem._id}>
              <Nav.Link exact as={NavLink} to={`/user/${activeApplication._id}/${menuItem._id}`} eventKey={menuItem._id} >
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
        let greaterThenMenu = menuObject.map((menuItem, index) => {
          if (index > indexValue) {
            return <Nav.Item key={menuItem._id} onClick={handleMenuOpen}>
              <Nav.Link exact as={NavLink} to={`/user/${activeApplication._id}/${menuItem._id}`} eventKey={menuItem._id} >
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
      <header className="header">
        <Container fluid>
          <Row>
            <Col sm={2} className="logo pl-1 pr-0">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="Logo"
                /></NavLink>
              <div className="customApplicationDropdown">
                <DropdownButton
                  title={activeApplication && activeApplication.label}
                  id="basic-nav-dropdown"
                  onSelect={handleApplicationSelect}
                >
                  {
                    applicationsList.map(application => <Dropdown.Item eventKey={JSON.stringify(application)}>{application.label}</Dropdown.Item>)
                  }
                  < Dropdown.Divider />
                </DropdownButton>
              </div>
            </Col>
            <Col sm={7}>
              <Nav
                activeKey={activeMenuItem}
                onSelect={(selectedKey) => handleOnSelect(selectedKey)}
                className="nav-main"
              >
                {
                  renderMenuItem(7, "lessThen")
                }
                {
                  menuObject.length > 7 &&
                  <div className={menuOpen ? "menuDropdown menuOpen nav-link" : 'menuDropdown nav-link'}>
                    <div className="menuOpenIcon" onClick={handleMenuOpen}>Others <FaSortDown /></div>
                    <div className="menuDropdownItem" >
                      {
                        renderMenuItem(6, "greaterThen")
                      }
                    </div>
                  </div>
                }
              </Nav>
            </Col>
            <Col sm={3}>
              <Row>
                <Col sm="5" className="text-right ">
                  <div className={searchOpen ? "applicationSearch open" : "applicationSearch"}>
                    <Form.Control type="text" placeholder="Search..." />
                    <div className="SearchIcon" onClick={handleApplicationSearch}><FaSearch /></div>
                  </div>
                </Col>
                <Col sm="7" className="text-right ">
                  <div className="setting-notification-profile">
                    <NavLink to="/setup" ><FaCog /></NavLink>
                    <NavLink to="/notifications" ><FaBell /></NavLink>
                    <div className="userDropdown">
                      <NavDropdown title={<FaUserCircle />} id="userDropdown" >
                        <NavDropdown.Item as="NavLink" href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>
        </Container>
      </header>
    </>
  )

}


export default withRouter(Header);