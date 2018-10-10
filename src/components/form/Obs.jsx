import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';

// TODO perhaps a little refactoring to have all these if/thens... maybe make underlying ObsDate, ObsCoded, ObsNumeric, worth it?
const Obs = (props) => {

  const conceptAnswerDisplay = (value, conceptAnswers) => {

    if (value) {
      const matchingAnswer = conceptAnswers.find(ans => ans.uuid === value);
      return matchingAnswer ? matchingAnswer.name.name : null;
    }
    else {
      return null;
    }
  };

  const name = `obs|path=${props.path}|concept=${props.concept}`;

  // TODO: type should be controlled based on datatype of concept
  if (props.datatype === 'date') {
    if (props.context.mode === 'edit') {
      return (
        <Field
          component={CustomDatePicker}
          name={name}
          validate={props.validate}
        />
      );
    }
    else {
      return (
        <span>{props.value}</span>
      );
    }
  } else if (props.widget === 'checkbox') {
    if (props.context.mode === 'edit') {
      return (
        <Field
          checkBoxValue={props.checkBoxValue}
          component={CheckBox}
          name={name}
          options={props.conceptAnswer}
          title={props.checkBoxTitle}
        />
      );
    }
    else {
      return (
        <span>{props.value ? 'X' : ''}</span>
      );
    }
  }
  else if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.widget === 'dropdown') {
      if (props.context.mode === 'edit') {
        return (
          <Field
            component={Dropdown}
            list={props.conceptAnswers}
            name={name}
            title={props.dropDownTitle}
          />
        );
      }
      else {
        return (
          <span>{conceptAnswerDisplay(props.value, props.conceptAnswers)}</span>
        );
      }
    }
    else {
      if (props.context.mode === 'edit') {
        return (
          <Field
            component={ButtonGroup}
            name={name}
            options={props.conceptAnswers}
          />
        );
      }
      else {
        return (
          <span>{conceptAnswerDisplay(props.value, props.conceptAnswers)}</span>
        );
      }
    }
  }
  else {
    if (props.context.mode === 'edit') {
      return (
        <Field
          component={FieldInput}
          name={name}
          placeholder={props.placeholder}
          type={props.datatype}
          validate={props.validate}
          warn={props.warn}
        />
      );
    }
    else {
      return (
        <span>{props.value}</span>
      );
    }
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

// TODO extract out `obs|path=${props.path}|concept=${props.concept}` to some common location?
const mapStateToProps = (state, props) => {
  return {
    value: props.context ? props.context.selector(state, `obs|path=${props.path}|concept=${props.concept}`) : null
  };
};

export default withFormContext(connect(mapStateToProps)(Obs));
