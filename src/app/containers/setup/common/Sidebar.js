import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Input from "../../../components/atom/Input";
import { Accordion, Card } from 'react-bootstrap';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

const Sidebar = props => {

  const { sideMenusAjaxData } = props;
  const [searchSideMenu, setSearchSidemenu] = useState(sideMenusAjaxData);
  const [sideMenus, setSideMenus] = useState(sideMenusAjaxData);


  const handleInnerSearch = async (name, value, id) => {
    let objDataIndex = searchSideMenu.findIndex(it => it.label === name);
    let indexChildren = searchSideMenu[objDataIndex].children;
    let searchObject = await searched(indexChildren, value);
    if (value && value.trim() != '') {
      sideMenus[objDataIndex]['children'] = searchObject;
      sideMenus[objDataIndex]['isExpand'] = true;
      setSideMenus(sideMenus);
    }
    else {
      setSideMenus(sideMenusAjaxData);
    }
  }

  const quickSearch = async (name, value, id) => {
    let search = value;
    let newData = await searched(sideMenusAjaxData, search);
    setSideMenus([])
    if (search && search.trim() != '') {
      setSideMenus(newData);
    }
    else {
      setSideMenus([...sideMenusAjaxData]);
    }
  }
  const searched = (items, term) => {
    return items.reduce((acc, item) => {
      if (contains(item.label, term)) {
        acc.push(item);
      } else if (item.children && item.children.length > 0) {
        let newItems = searched(item.children, term);
        if (newItems && newItems.length > 0) {
          acc.push({ label: item.label, children: newItems, isExpand: true });
        }
      }
      return acc;
    }, []);
  }

  const contains = (text, term) => {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  }


  const traverseSideMenus = (object, selectedLabel) => {
    return object.map(item => {
      if (item.label === selectedLabel) {
        item.isExpand = !item.isExpand
      }
      if (item.children) {
        traverseSideMenus(item.children, selectedLabel)
      }
      return item;
    })
  }
  /**
   * handleAccordionClick - handle add and remove active class on Accordion
   * @param {String} selectedLabel 
   */
  const handleAccordionClick = async (selectedLabel) => {
    let results = await traverseSideMenus(sideMenus, selectedLabel);
    setSideMenus(results);

  }

  console.log('sidemenu>>>>>>>>>>>>>>', sideMenus)

  /**
   * accordionsFormation - call for create nested accordion as per accordionArray
   * @param {Array} accordionArray 
   * @param {String} parentLabel 
   */
  const accordionsFormation = (accordionArray, parentLabel) => {
    return accordionArray && accordionArray.map((item, index) => {
      return <>
        {
          item.children ?
            <Accordion defaultActiveKey={item.isExpand === true ? item.label + parentLabel : ''}>
              <Card key={item.label + parentLabel}>
                <Accordion.Toggle as={Card.Header} variant="link"
                  className={item.isExpand === true ? 'activeAccordion' : ''} onClick={() => handleAccordionClick(item.label)} eventKey={item.label + parentLabel}>
                  {item.label} {item.isExpand ? <FaSortUp className="faSortUp" /> : <FaSortDown className="faSortDown" />}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.label + parentLabel}>
                  <Card.Body>
                    <>
                      {item.isSearch && <div className="accordionLevelSearch">
                        <Input
                          id={item.label + "-search"}
                          type='text'
                          name={item.label}
                          placeholder="Search Items..."
                          onChange={handleInnerSearch}
                          className="roundInput"
                        /></div>}
                      {accordionsFormation(item.children, item.label + parentLabel)}
                    </>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion > : <NavLink to={item.routerLink} className="linkText" key={item.label + parentLabel} >{item.label}</NavLink>
        }
      </>
    }
    )
  }

  return (
    <><div>
      <div className="sidebar-panels">
        <Input
          id="quickSearch"
          type='text'
          name="quickSearch"
          placeholder="Quick Search..."
          onChange={quickSearch}
          className="roundInput"
        />
      </div>
      {accordionsFormation(sideMenus, "firstLevel")}
    </div>
    </>
  )

}


export default withRouter(Sidebar);