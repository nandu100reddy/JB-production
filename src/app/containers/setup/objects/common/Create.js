import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getObjectById, createObject, updateObject } from '../../../../../core/actions/Objects.action';
import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../../../../components/atom/Button';
import Input from '../../../../components/atom/Input'
import Checkbox from '../../../../components/atom/Checkbox'



const Create = props => {
  const { applicationId, match: { params: { id } } } = props;
  const [objectDetails, setObjectDetails] = useState({
    object: {
      application_id: applicationId ? applicationId._id : '',
      name: '',
      description: '',
      label: '',
      plural_label: '',
      active: true,
      custom: true,
      addNotes: false,
      addAttachment: false,
      tabMenu: false
    },
    error: {
      nameError: null,
      descriptionError: null,
      labelError: null,
      plural_labelError: null,
      activeError: null,
    },
    isValidate: true,
  })

  useEffect(() => {
    if (id) {
      getObjectById();
    }
  }, [])

  const getObjectById = async () => {
    const { object } = objectDetails;
    props.getObjectById(id, applicationId).then(response => {
      if (response && response.status === 200) {
        const { data, data: { result } } = response;
        if (data.statusCode === 1) {
          setObjectDetails({
            ...objectDetails,
            object: {
              ...object,
              ...result
            }
          });
        } else {
          alert("Api Error : " + result.message);
        }
      } else {
        console.log(response.status)
      }
    });
  }


  /**
  * handleChange - function use for handle/set form input field value to component state({Object} - userDetails)
  * @params {Object} event 
  */
  const handleChange = (name, value, id) => {
    const { object } = objectDetails;
    object[name] = value;
    setObjectDetails({
      ...objectDetails,
      ...object,
    });
  }

  const handleBlur = () => {

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { object } = objectDetails;
    if (applicationId && applicationId._id) {
      object.master = 1;
    }
    // Call Application Action 
    props.createObject(object)
      .then(response => {
        if (response && response.status === 200) {
          const { data, data: { result } } = response;
          // check Object Created successfully and redirect on Object List Page
          if (data.statusCode === 1) {
            alert("Object name Created Successfully!".replace("name", result.name));
            applicationId ?
              props.history.push(`/setup/${applicationId._id}/objects`) :
              props.history.push(`/setup/objects`);
          } else {
            alert("Api Error : " + result.message);
          }
        } else {
          console.log(response.status)
        }
      });
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const { object } = objectDetails;
    if (applicationId && applicationId._id) {
      object.master = 1;
    }
    // Call Application Action 
    props.updateObject(object)
      .then(response => {
        if (response && response.status === 200) {
          const { data, data: { result } } = response;
          // check Application Updated success and redirect on Setup Page
          if (data.statusCode === 1) {
            alert("Object Updated Successfully!");
            applicationId ?
              props.history.push(`/setup/${applicationId._id}/objects`) :
              props.history.push(`/setup/objects`);
          } else {
            alert("Api Error : " + result.message);
          }
        } else {
          console.log(response.status)
        }
      });
  }

  const {
    object: {
      name,
      label,
      plural_label,
      description,
      custom,
      active,
      addNotes,
      addAttachment,
      tabMenu
    },
    error: {
      nameError,
      labelError,
      plural_labelError,
      descriptionError,
      activeError,
    },
    isValidate
  } = objectDetails;

  return (
    <Container fluid>
      <Row className="header_createeditobject">
        <Col sm={6}>
          <span className="heading_eachline">{id ? "Edit Custom Object" : "Create New Custom Object"} : {name}</span>
          <span className="subheading_eachline" style={{ display: "flex" }}>{id ? "Edit" : "Create"} the Object items</span>
        </Col>
        <Col sm={6} className="pt-3 text-right inlineBtnWrap">
          {
            id ?
              <CustomButton
                id="objectSubmit"
                type="submit"
                onClick={handleUpdate}
                disabled={!isValidate}
                variant="dark"
                text="Update"
                className="mr-3" /> :
              <CustomButton
                id="objectSubmit"
                type="submit"
                onClick={handleSubmit}
                disabled={!isValidate}
                variant="dark"
                text="Save"
                className="mr-3" />
          }
          <CustomButton
            variant="dark"
            text="Cancel"
            type="submit"
            id="creatEditObjectCancel"
            onClick={() => applicationId ?
              props.history.push(`/setup/${applicationId._id}/objects`) :
              props.history.push(`/setup/objects`)
            }
          />
        </Col>
      </Row>

      <Row xs={1} className="table_div_margin_objectList border_createEditscreen">
        <Col className="heading_object_screens heading_eachline">Basic Object Information</Col>
        <Col>
          <Row xs={1}>
            <Col xs={6} className="pt-4">
              <Input type="text"
                id="name"
                label="Object Name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Object Name"
                onBlur={handleBlur}
                error={nameError}
                className={nameError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
                required={true} />

            </Col>
            <Col xs={6} className="pt-4">
              <Input type="text"
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                onBlur={handleBlur}
                error={descriptionError}
                className={descriptionError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
                required={true} />

            </Col>
          </Row>
        </Col>
        <Col className="heading_object_screens heading_eachline mtb20">Object Display Information</Col>
        <Row xs={1}>
          <Col xs={6} className="pt-4">
            <Input type="text"
              id="label"
              label="Display Name"
              name="label"
              value={label}
              onChange={handleChange}
              placeholder="Display Name"
              onBlur={handleBlur}
              error={labelError}
              className={labelError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
              required={true} />
          </Col>
          <Col xs={6} className="pt-4">
            <Input type="text"
              id="plural_label"
              label="Plural Name"
              name="plural_label"
              value={plural_label}
              onChange={handleChange}
              placeholder="Plural Name"
              onBlur={handleBlur}
              error={plural_labelError}
              className={plural_labelError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
              required={true} />
          </Col>
          <Col xs={1}></Col>
          <Col xs={3} className="pt-4" >
            <Checkbox className="lbm"
              name="active"
              label="Active"
              checked={active}
              value={active}
              error={activeError}
              className={activeError ? "inlineLabelInput is-invalid" : "inlineLabelInput"}
              onChange={handleChange} />
          </Col>
        </Row>
        <Col className="heading_object_screens heading_eachline mtb20">Quick Additions</Col>
        <Col style={{ marginBottom: "4%" }}>
          <Checkbox name="addNotes" label="AddNotes(Related list to default page layout)"
            checked={addNotes} value={addNotes} onChange={handleChange} />
          <Checkbox name="addAttachment" label="Add Attachment(Related list to default page layout)"
            checked={addAttachment} value={addAttachment} onChange={handleChange} />
          <Checkbox name="tabMenu" label="Display in Tab Menu"
            checked={tabMenu} value={tabMenu} onChange={handleChange} />
        </Col>
      </Row>
    </Container>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    objectDetails: state.objects.object
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    getObjectById,
    createObject,
    updateObject,
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(Create));