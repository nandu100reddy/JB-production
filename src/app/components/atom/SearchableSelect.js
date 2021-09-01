import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from './Tooltip';
import AsyncSelect from 'react-select/async';
import { loadLookupDataList } from '../../../core/actions/Common.action';
import _ from 'lodash';

const SearchableSelect = (props) => {
  const { defaultOptions, placeholder, id, value, className, label, helpText, prependIcon, error, required, name, lookupIDsObject } = props;
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (selectedOption, name, id) => {
    setSelectedOption(selectedOption);
    if (props.onChange) {
      props.onChange(name, selectedOption, id);
    }

  };

  const mapOptionsToValues = options => {
    return options.map(option => ({
      value: option._id,
      label: option.data && option.data.data,
      data: option.data
    }));
  };

  const getOptions = _.debounce((inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }
    props.loadLookupDataList(lookupIDsObject.activeApplicationId, lookupIDsObject.ObjectId, lookupIDsObject.fieldId, inputValue).then(response => {
      const { data: { result } } = response;
      if (props.mapOptionsToValues)
        callback(props.mapOptionsToValues(result));
      else callback(mapOptionsToValues(result));
    });
  }, 3000);

  return (
    <>
      <Form.Group controlId={id} className={className}>
        {label && <Form.Label>{label}{required && <sup>*</sup>}</Form.Label>}
        <InputGroup>
          <div style={{ width: "100%" }}>
            <AsyncSelect
              className="searchSelect"
              inputId={id}
              cacheOptions
              value={selectedOption}
              defaultOptions={defaultOptions}
              loadOptions={getOptions}
              placeholder={placeholder}
              name={name}
              onChange={(selectedOption) => handleChange(selectedOption, name, id)}
            />
          </div>
          {
            helpText &&
            <InputGroup.Text id={id + "Prepend"}><Tooltip tooltipText={helpText} /></InputGroup.Text>
          }
          {
            prependIcon &&
            <InputGroup.Prepend>
              <InputGroup.Text id={id + "Prepend"}>{prependIcon}</InputGroup.Text>
            </InputGroup.Prepend>
          }
        </InputGroup>

        {error && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </>

  );
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
    loadLookupDataList
  },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(SearchableSelect));