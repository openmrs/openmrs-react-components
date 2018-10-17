import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { DATE_FORMAT } from "../../constants";
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';
import withObsGroupContext from './withObsGroupContext';

import '../../../assets/css/obs.css';

// TODO perhaps a little refactoring to have all these if/thens... maybe make underlying ObsDate, ObsCoded, ObsNumeric, worth it?
const Obs = (props) => {

  const conceptAnswerDisplay = (value, conceptAnswers) => {

    if (value) {
      const matchingAnswer = conceptAnswers.find(ans => ans.uuid === value);

      if (matchingAnswer.display) {
        return matchingAnswer.display;
      }

      if (matchingAnswer.name) {
        return matchingAnswer.name.display  ? matchingAnswer.name.display : matchingAnswer.name;
      }

      return null;
    }
    else {
      return null;
    }
  };

  // TODO: type should be controlled based on datatype of concept
  if (props.datatype === 'date') {
    if (props.formContext.mode === 'edit') {
      return (
        <Field
          component={CustomDatePicker}
          name={props.name}
          validate={props.validate}
        />
      );
    }
    else {
      return (
        <span className="obs-edit-value">{moment(new Date(props.value)).format(DATE_FORMAT)}</span>
      );
    }
  } else if (props.widget === 'checkbox') {
    if (props.formContext.mode === 'edit') {

      return (
        <Field
          checkBoxValue={props.conceptAnswer}
          component={CheckBox}
          name={props.name}
          onBlur={e => { e.preventDefault(); }}
          title={props.checkBoxTitle}
        />
      );
    }
    else {
      return (
        <span className="obs-checkbox-edit-value">{`${props.checkBoxTitle}: `} {props.value ? 'X' : ''}</span>
      );
    }
  }
  else if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.widget === 'dropdown') {
      if (props.formContext.mode === 'edit') {
        return (
          <Field
            component={Dropdown}
            defaultValue={props.defaultValue}
            dropDownStyle={props.dropDownStyle}
            list={props.conceptAnswers}
            name={props.name}
            title={props.dropDownTitle}
          />
        );
      }
      else {
        return (
          <span className="obs-edit-value">{conceptAnswerDisplay(props.value, props.conceptAnswers)}</span>
        );
      }
    }
    else {
      if (props.formContext.mode === 'edit') {
        return (
          <Field
            component={ButtonGroup}
            name={props.name}
            options={props.conceptAnswers}
          />
        );
      }
      else {
        return (
          <span
            className="obs-edit-value"
            style={{}}
          >{conceptAnswerDisplay(props.value, props.conceptAnswers)}</span>
        );
      }
    }
  }
  else {
    if (props.formContext.mode === 'edit') {
      return (
        <Field
          component={FieldInput}
          name={props.name}
          placeholder={props.placeholder}
          type={props.datatype}
          validate={props.validate}
          warn={props.warn}
        />
      );
    }
    else {
      return (
        <span
          className="obs-edit-field-input-value"
        >{props.value}</span>
      );
    }
  }
};

Obs.propTypes = {
  concept: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
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

// utility method to allow us to accept a string uuid or an object for a concept
const getUuid = (concept) => {
  return concept.uuid ? concept.uuid : concept;
};

const mapStateToProps = (state, props) => {

  let concepts = '';

  if (props.obsGroupContext) {
    concepts = props.obsGroupContext.groupingConcepts
      .map((concept) => getUuid(concept))
      .reduce((acc, item) => acc + item + '^', '');
  }

  concepts += getUuid(props.concept);

  const fullPath = (props.obsGroupContext ? props.obsGroupContext.path + '^' : '') + props.path;

  const name = `obs|path=${fullPath}|concept=${concepts}`;

  return {
    name: name,
    value: props.formContext ? props.formContext.selector(state, name) : null
  };
};

export default withObsGroupContext(withFormContext(connect(mapStateToProps)(Obs)));
