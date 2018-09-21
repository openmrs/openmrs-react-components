import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';

const Obs = (props) => {
  if (props.datatype === 'date') {
    return (
      <Field
        component={CustomDatePicker}
        name={`obs|path=${props.path}|concept=${props.concept}`}
      />
    );
  }

  // TODO: type should be controlled based on datatype of concept

  if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.widget === 'dropdown') {
      return (
        <Field
          component={Dropdown}
          list={props.conceptAnswers}
          name={`obs|path=${props.path}|concept=${props.concept}`}
          title={props.dropDownTitle}
        />);
    } else if (props.widget === 'checkbox') {
      return (
        <Field
          component={CheckBox}
          name={`obs|path=${props.path}|concept=${props.concept}`}
          options={props.conceptAnswers}
          title={props.checkBoxTitle}
        />);
    } else {
      return (
        <Field
          component={ButtonGroup}
          name={`obs|path=${props.path}|concept=${props.concept}`}
          options={props.conceptAnswers}
        />);
    }
  } else {
    return (
      <Field
        component={FieldInput}
        name={`obs|path=${props.path}|concept=${props.concept}`}
        placeholder={props.placeholder}
        type={props.datatype}
        validate={props.validate}
        value={props.value}
        warn={props.warn}
      />
    );
  }
};

Obs.propTypes = {
  concept: PropTypes.string.isRequired,
  conceptAnswers: PropTypes.array,
  datatype: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func]),
  value:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  warn: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func]),
};

Obs.defaultProps = {
  datatype: 'number'
};

export default Obs;
