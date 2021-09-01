import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createApplication,
  updateApplication,
  loadApplicationById,
} from "../../../../../core/actions/Applications.action";
import { getObjects } from "../../../../../core/actions/Objects.action";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../../../components/atom/Button";
import Input from "../../../../components/atom/Input";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const selectedObject = [
  {
    custom: 0,
    type: null,
    active: 1,
    deleted_at: null,
    deleted_by_id: null,
    _id: "60db594d2e0c91528b6f90a0",
    name: "Risks",
    label: "Risks",
    plural_label: "Risks",
    description: "Risks",
    created_at: 1624987981198,
    created_by_id: "60bd693a144ddd5a9dfbf362",
    owner_id: "60bd693a144ddd5a9dfbf362",
    modified_at: 1624987981198,
    last_modified_by_id: "60bd693a144ddd5a9dfbf362",
    api_name: "Risks",
  },
  {
    custom: 0,
    type: null,
    active: 1,
    deleted_at: null,
    deleted_by_id: null,
    _id: "60db594d2e0c91528b6f90ae",
    name: "Goal",
    label: "Goal",
    plural_label: "Goals",
    description: "Goals",
    created_at: 1624987981266,
    created_by_id: "60bd693a144ddd5a9dfbf362",
    owner_id: "60bd693a144ddd5a9dfbf362",
    modified_at: 1624987981266,
    last_modified_by_id: "60bd693a144ddd5a9dfbf362",
    api_name: "Goal",
  },
];

const Create = (props) => {
  const { id } = props.match.params;
  const [applicationDetails, setApplicationDetails] = useState({
    application: {
      name: "",
      label: "",
      plural_label: "",
    },
    error: {
      nameError: null,
      labelError: null,
      plural_labelError: null,
    },
    isValidate: true,
  });
  const {
    application: { name, label, plural_label },
    error: { nameError, labelError, plural_labelError },
    isValidate,
  } = applicationDetails;

  const [state, setState] = useState({
    items: [],
    selected: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      let record = await dispatch(
        // loadObjectByApplicationId(activeApplication._id)
        getObjects()
      );

      const finalObject = record.data.result.objectStandard.filter(
        (value) => !selectedObject.some((val) => val._id === value._id)
      );
      const newState = {
        items: finalObject,
        selected: selectedObject,
      };
      setState(newState);
    }
    fetchData();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    //Get the selected array of objects
    const selectedObject = state.selected.map((values) => {
      return values._id;
    });

    let payload = {
      application_id: id,
      selected_object: selectedObject,
    };
    alert(JSON.stringify(payload));
    //   let result = await dispatch(
    //     updateApplicationSelectedObjectToDisplay(payload)
    //   );
    //   console.log(result,"save result")
  };
  const id2List = {
    droppable: "items",
    droppable2: "selected",
  };
  const getList = (id) => state[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let replaceState = {};

      if (source.droppableId === "droppable2") {
        replaceState = {
          items: state.items,
          selected: items,
        };
      } else {
        replaceState = {
          items: items,
          selected: state.selected,
        };
      }

      setState(replaceState);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  useEffect(() => {
    if (id) {
      getApplicationById();
    }
  }, []);

  /**
   * Function for get application details by application Id
   * Function Execute when application edit mode ON
   */
  const getApplicationById = async () => {
    props.loadApplicationById(id).then((response) => {
      if (response && response.status === 200) {
        const {
          data,
          data: {
            result,
            result: { application },
          },
        } = response;
        if (data.statusCode === 1) {
          setApplicationDetails({
            ...applicationDetails,
            application,
          });
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status);
      }
    });
  };

  /**
   * handleChange - function use for handle/set form input field value to component state({Object} - userDetails)
   * @params {Object} event
   */
  const handleChange = (name, value, id) => {
    const { application } = applicationDetails;
    application[name] = value;
    setApplicationDetails({
      ...applicationDetails,
      ...application,
    });
  };

  const handleBlur = () => { };
  /**
   * Function for create application data
   * @param {object} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const { application } = applicationDetails;
    // Call Application Action
    props.createApplication(application).then((response) => {
      if (response && response.status === 200) {
        const {
          data,
          data: { result },
        } = response;
        // check Application Created success and redirect on Setup Page
        if (data.statusCode === 1) {
          alert(
            "Application applicationName Created Successfully!".replace(
              "applicationName",
              result.application.name
            )
          );
          props.history.push("/setup/applications");
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status);
      }
    });
  };
  /**
   * Function for Update application data
   * @param {object} event
   */
  const handleUpdate = (event) => {
    event.preventDefault();
    const { application } = applicationDetails;
    // Call Application Action
    props.updateApplication(application).then((response) => {
      if (response && response.status === 200) {
        const {
          data,
          data: { result },
        } = response;
        // check Application Updated success and redirect on Setup Page
        if (data.statusCode === 1) {
          alert(
            "Application applicationName Updated Successfully!".replace(
              "applicationName",
              result.application.name
            )
          );
          props.history.push("/setup/applications");
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status);
      }
    });
  };

  return (
    <Container fluid>
      <Row className="header_createeditobject">
        <Col sm={6}>
          <span className="heading_eachline">
            {id ? "Edit Application" : "Create New Application"}
          </span>
          <span className="subheading_eachline" style={{ display: "flex" }}>
            {id ? "Edit" : "Create"} the Application items
          </span>
        </Col>
        <Col sm={6} className="pt-3 text-right inlineBtnWrap">
          {id ? (
            <CustomButton
              id="applicationSubmit"
              type="submit"
              onClick={handleUpdate}
              disabled={!isValidate}
              variant="dark"
              text="Update"
              className="mr-3"
            />
          ) : (
              <CustomButton
                id="applicationSubmit"
                type="submit"
                onClick={handleSubmit}
                disabled={!isValidate}
                variant="dark"
                text="Save"
                className="mr-3"
              />
            )}
          <CustomButton
            id="applicationCancel"
            type="submit"
            onClick={() => props.history.push("/setup/applications")}
            variant="dark"
            text="Cancel"
          />
        </Col>
      </Row>

      <Row
        xs={1}
        className="table_div_margin_objectList border_createEditscreen"
      >
        <Col className="heading_object_screens heading_eachline">
          Basic Application Information
        </Col>
        <Col>
          <Row xs={1}>
            <Col xs={6} className="pt-4">
              <Input
                type="text"
                id="name"
                label="Application Name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Application Name"
                onBlur={handleBlur}
                error={nameError}
                className={
                  nameError ? "inlineLabelInput is-invalid" : "inlineLabelInput"
                }
                required={true}
              />
            </Col>
            <Col xs={6} className="pt-4">
              <Input
                type="text"
                id="label"
                label="Label"
                name="label"
                value={label}
                onChange={handleChange}
                placeholder="Label"
                onBlur={handleBlur}
                error={labelError}
                className={
                  labelError
                    ? "inlineLabelInput is-invalid"
                    : "inlineLabelInput"
                }
                required={true}
              />
            </Col>
          </Row>
        </Col>
        <Col className="heading_object_screens heading_eachline mtb20">
          Application Display Information
        </Col>
        <Col xs={6}>
          <Input
            type="text"
            id="plural_label"
            label="Plural Label"
            name="plural_label"
            value={plural_label}
            onChange={handleChange}
            placeholder="Plural Label"
            onBlur={handleBlur}
            error={plural_labelError}
            className={
              plural_labelError
                ? "inlineLabelInput is-invalid"
                : "inlineLabelInput"
            }
            required={true}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className="mt-2 p-2 fontWeight_RecordView bgColorBorder_RecordView"
        >
          Tabs setting
        </Col>
        <Col xs={12} className="bgColorFFFBorder_RecordView">
          <Row>
            <DragDropContext onDragEnd={onDragEnd}>
              <Col xs={5}>
                <span>Objects available to be added in tab</span>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {state.items.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col
                xs={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>Simply Drag And Drop</span>
              </Col>
              <Col xs={5}>
                <span>Tabs to be displayed</span>

                <Droppable droppableId="droppable2">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {state.selected.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            </DragDropContext>
          </Row>
          <CustomButton
            variant="dark"
            text="Save"
            type="submit"
            className="mr-2"
            id="createFieldSave"
            onClick={handleSave}
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    applicationData: state.application.applicationData,
  };
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators(
    {
      createApplication,
      updateApplication,
      loadApplicationById,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToAction)(Create)
);
