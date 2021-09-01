import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Input from "../../../../../components/atom/Input";
import { Accordion, Card } from 'react-bootstrap';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import CustomButton from '../../../../../components/atom/Button'

const Sidebar = props => {
  const { sideMenuList, activeMenuItem } = props;
  const [sideMenus, setSideMenus] = useState(sideMenuList);
  const [innerSearchValue, setInnerSearch] = useState();




  const handleInnerSearch = (name, value, id) => {
    let searchValue = value;
    let objDataIndex = sideMenuList.findIndex(it => it.isSearch);
    let searchObject = searched(sideMenuList[objDataIndex]['children'], searchValue);
    sideMenus[objDataIndex]['children'] = searchObject;
    sideMenuList[objDataIndex]['isExpand'] = true;
    if (searchValue && searchValue != '') {
      setSideMenus([...sideMenus]);
    }
    else {
      setSideMenus([...sideMenuList]);
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

  // const handleChildrenLabel=(opt)=>{
  //   alert(opt)
  // }


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
                  <Card.Body >
                    <>
                      {item.isSearch && <div className="accordionLevelSearch">
                        <Input
                          id={item.label + "-search"}
                          type='text'
                          name={item.label + "-search"}
                          value={innerSearchValue}
                          placeholder="Search Items..."
                          onChange={handleInnerSearch}
                          className="roundInput"
                        /></div>}
                      {accordionsFormation(item.children, item.label + parentLabel)}
                      {/* {console.log("item.children",item.children, item.label + parentLabel)} */}
                    </>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion > : item.routerLink ?
              <NavLink to={`/`} className="linkText" key={item.label + parentLabel}
                onClick={() => props.handleChildrenLabel(item.label)} >{item.label}
              </NavLink> :
              <a href="javascript:void(0);" onClick={() => props.handleRelatedListItemClick(item)}
                className={activeMenuItem.label === item.label ? "linkText activeItem" : "linkText"}
                id={item.label.replace(/\s/g, '') + parentLabel.replace(/\s/g, '')} key={item.label + parentLabel}>
                {item.label}
              </a>
        }
      </>
    }
    )
  }

  return (
    <>
      {accordionsFormation(sideMenus, "firstLevel")}
    </>
  )
}


export default withRouter(Sidebar);