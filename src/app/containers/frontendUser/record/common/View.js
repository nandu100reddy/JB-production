import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecordById, getRelatedListByRecordId } from '../../../../../core/actions/Records.action';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import CommonTopSection from './view/CommonTopSection';
import Sidebar from './view/Sidebar';
import OverviewFieldSection from './view/OverviewFieldSection';
import RelatedList from './view/RelatedList';
import Common from './view/Common';

const defaultSideMenuArray = [
  {
    label: "Field Sections",
    isExpand: true,
    isSearch: false,
    children: [],
  },
  {
    label: "Related List",
    isExpand: true,
    isSearch: true,
    children: [],
  },
];

const View = (props) => {
  const { activeApplication, currentObject, match: { params: { id } } } = props;
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [sideMenuList, setSideMenuList] = useState(defaultSideMenuArray);
  const [recordDetails, setRecordDetails] = useState([]);
  const [highlightPanel, setHighlightPanel] = useState([]);

  useEffect(async () => {
    await getRecordByRecordID();
    await relatedListByRecordID();
  }, []);


  useEffect(async () => {
    await getRecordByRecordID();
    await relatedListByRecordID();
  }, [currentObject._id])


  const getRecordByRecordID = () => {
    props.getRecordById(id, currentObject._id, activeApplication._id).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;
        if (data.statusCode === 1) {
          setRecordDetails(result.objectDataWithPageLayout);
          setHighlightPanel(result.highlightPanel);
          insertSideMenuChildren(result.objectDataWithPageLayout, 0);
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }
  const relatedListByRecordID = () => {
    props.getRelatedListByRecordId(currentObject._id).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;
        if (data.statusCode === 1) {
          insertSideMenuChildren(result.relatedList, 1);
          //insertSideMenuChildren(relatedList, 1); //remove this line of code and unComment above line of code  after api implementation
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }


  const insertSideMenuChildren = (sideMenuChildList, index) => {
    let children = [];
    if (index === 0) {
      sideMenuChildList.map(item => {
        children.push({ label: item.section, fieldSection: true })
      })
      setActiveMenuItem(children[0]);
    }
    if (index === 1) {
      sideMenuChildList.map(item => {
        item.count = item.count || 0;
        item.label = item.label + "(" + item.count + ")";
        item.relatedList = true
      })
      children = sideMenuChildList;
    }
    sideMenuList[index].children = children;
    setSideMenuList(sideMenuList);
  };

  const handleRelatedListItemClick = (item) => {
    setActiveMenuItem(item);
  }

  return (
    <>
      <div className="setupWrapper">
        <div className="setupMain">
          <Container fluid>
            <CommonTopSection
              activeApplication={activeApplication}
              currentObject={currentObject}
              highlightPanel={highlightPanel}
            />
            <Row>
              <Col sm={2} className="setup-sidebar pl-0 pr-0 mt-4">
                <Sidebar
                  sideMenuList={sideMenuList}
                  activeMenuItem={activeMenuItem}
                  handleRelatedListItemClick={handleRelatedListItemClick}
                />
              </Col>
              <Col sm={10} className="recordViewMain mt-4">
                {
                  activeMenuItem.fieldSection &&
                  <Tabs defaultActiveKey="overView" id="recordViewMain">
                    <Tab eventKey="overView" title="OverView">
                      <Container fluid >
                        {
                          recordDetails.map(item => <OverviewFieldSection recordDetails={item} />)
                        }
                        {/* <Common /> */}
                      </Container>
                    </Tab>
                    <Tab eventKey="history" title="History">
                      <div>History</div>
                    </Tab>
                    <Tab eventKey="chatter" title="Chatter">
                      <div>Chatter</div>
                    </Tab>
                  </Tabs>
                }
                {activeMenuItem.relatedList &&
                  <RelatedList activeApplication={activeApplication} currentObject={currentObject}
                    activeMenuItem={activeMenuItem} />
                }
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    getRecordById,
    getRelatedListByRecordId
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(View));
