import React, { useState } from 'react';

import Radio from '../atom/Radio';
import Checkbox from '../atom/Checkbox';
import AutoNumber from '../atom/AutoNumber';
import Input from '../atom/Input';
import Datepicker from '../atom/Datepicker';
import SelectDropdown from '../atom/SelectDropdown';
import Number from '../atom/Number';
import PhoneNumber from '../atom/PhoneNumber';
import Textarea from '../atom/Textarea';
import Duration from '../atom/Duration';
import ColorPicker from '../atom/ColorPicker';
import ProgressBar from '../atom/ProgressBar';
import SearchableSelect from '../atom/SearchableSelect';

const CreateForm = props => {
  const { label, type, id, helpText, options, onSelect, onChange, error, required,
    name, checked, value, onBlur, placeholder, className, totalDigitLength, prependIcon,
    prefix, dateFormat, readOnly, rows, disabled, timeFormat, defaultOptions, mapOptionsToValues, lookupIDsObject,
    ...InputProps } = props;

  const createForm = () => {
    let formTag = '';
    switch (type) {
      case "checkbox":
        formTag = <Checkbox id={id} label={label} name={name} checked={checked} value={value} onChange={onChange} {...InputProps} />
        break;
      case "radio":
        formTag = <Radio id={id} label={label} name={name} checked={checked} value={value} onChange={onChange} {...InputProps} />
        break;
      case "autoNumber":
        formTag = <AutoNumber id={id} label={label} name={name} value={value} prefix={prefix} totalDigitLength={totalDigitLength}
          helpText={helpText} className={className} />
        break;
      case "date":
        formTag = <Datepicker
          closeOnScroll={true} dateFormat={dateFormat || "MM/dd/yyyy"} onChange={onChange} id={id} label={label}
          helpText={helpText} className={className} value={value} name={name} error={error}
          required={required} prependIcon={prependIcon}
        />
        break;
      case "dateTime":
        formTag = <Datepicker closeOnScroll={true} dateFormat={dateFormat || "h:mm aa"}
          showTimeSelectOnly timeIntervals={10} timeCaption="Time"
          showTimeSelect timeFormat="HH:mm" onChange={onChange} id={id} label={label}
          helpText={helpText} className={className} value={value} name={name} error={error} required={required}
          prependIcon={prependIcon}
        />
        break;
      case "time":
        formTag = <Datepicker closeOnScroll={true} dateFormat={dateFormat || "MM/dd/yyyy h:mm aa"}
          showTimeSelect timeFormat="HH:mm" onChange={onChange} id={id} label={label}
          helpText={helpText} className={className} value={value} name={name} error={error} prependIcon={prependIcon}
          required={required}
        />
        break;
      case "dropDown":
        formTag = <SelectDropdown options={options || []} value={value} onChange={onChange} name={name} customStyle="true"
          id={id} label={label} helpText={helpText} className={className} error={error} required={required}
        />
        break;
      case "dropDownMulti":
        formTag = <SelectDropdown options={options || []} value={value} onChange={onChange} name={name} closeMenuOnSelect={false}
          isMulti customStyle="false" id={id} label={label} helpText={helpText} className={className}
          error={error} required={required} />
        break;
      case "percentage":
        formTag = <Number onChange={onChange} suffix={'%'} value={value} allowNegative={false}
          label={label} helpText={helpText} className={className} prependIcon={prependIcon}
          error={error} required={required} name={name} id={id}
        />
        break;
      case "phone":
        formTag = <PhoneNumber international countryCallingCodeEditable={false} defaultCountry="IN" id={id}
          value={value} onChange={onChange} label={label} helpText={helpText} className={className} prependIcon={prependIcon}
          error={error} required={required} name={name} />
        break;
      case "textArea":
      case "textAreaRich":
        formTag = <Textarea type={type} rows={rows} required={required} name={name} value={value} onChange={onChange} disabled={disabled} readOnly={readOnly}
          onBlur={onBlur} id={id} />
        break;
      case "duration":
        formTag = < Duration type={type || "text"} id={id} label={label} name={name} value={value} onChange={onChange}
          placeholder={placeholder} onBlur={onBlur} error={error}
          className={className} required={required} helpText={helpText}
          prependIcon={prependIcon} />
        break;
      case "colorCoding":
        formTag = <ColorPicker type={type} id={id} label={label} name={name} value={value} onChange={onChange}
          placeholder={placeholder} onBlur={onBlur} error={error}
          className={className} required={required} helpText={helpText}
          prependIcon={prependIcon} />
        break;
      case "progressBar":
        formTag = <ProgressBar id={id} label={label} name={name} value={value} onChange={onChange}
          placeholder={placeholder} onBlur={onBlur} error={error} disabled={disabled}
          className={className} required={required} helpText={helpText}
        />
        break;
      case 'lookup':
        formTag = <SearchableSelect id={id} label={label} name={name} value={value} onChange={onChange}
          placeholder={placeholder} error={error} disabled={disabled} className={className} required={required}
          helpText={helpText} prependIcon={prependIcon} defaultOptions={defaultOptions} mapOptionsToValues={mapOptionsToValues}
          lookupIDsObject={lookupIDsObject} />
        break;
      case 'masterDetail':
        formTag = <>masterDetail</>
        break;
      case 'files':
        formTag = <>files</>
        break;
      case 'section':
        formTag = <>section</>
        break;
      case 'button':
        formTag = <>button</>
        break;
      default:
        formTag = <Input type={type || "text"} id={id} label={label} name={name} value={value} onChange={onChange}
          placeholder={placeholder} onBlur={onBlur} error={error}
          className={className} required={required}
          helpText={helpText} prependIcon={prependIcon}
        />
        break;
    }
    return formTag;
  }
  return (
    <>
      {createForm()}
    </>
  )
}

export default CreateForm;