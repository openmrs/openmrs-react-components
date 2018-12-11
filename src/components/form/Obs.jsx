import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formUtil from '../../features/form/util';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import TextArea from "../widgets/TextArea";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';
import withObsGroupContext from './withObsGroupContext';

// TODO perhaps a little refactoring to have all these if/thens... maybe make underlying ObsDate, ObsCoded, ObsNumeric, worth it?
const Obs = (props) => {

  // TODO: type should be controlled based on datatype of concept
  if (props.datatype === 'date') {
    return (
      <Field
        component={CustomDatePicker}
        displayValue={props.value}
        mode={props.formContext.mode}
        name={props.name}
        validate={props.validate}
      />
    );
  }
  else if (props.widget === 'checkbox') {
    return (
      <Field
        checkBoxValue={props.conceptAnswer}
        component={CheckBox}
        displayValue={props.value}
        mode={props.formContext.mode}
        name={props.name}
        onBlur={e => { e.preventDefault(); }}
        title={props.checkBoxTitle}
      />
    );
  }
  else if (props.widget === 'textarea') {
    return (
      <Field
        component={TextArea}
        displayValue={props.value}
        mode={props.formContext.mode}
        name={props.name}
        placeholder={props.placeholder}
      />
    );
  }
  else if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.widget === 'dropdown') {
      return (
        <Field
          component={Dropdown}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          displayValue={props.value}
          dropDownStyle={props.dropDownStyle}
          list={props.conceptAnswers}
          mode={props.formContext.mode}
          name={props.name}
          placeholder={props.placeholder}
          title={props.dropDownTitle}
        />
      );
    }
    else {
      return (
        <Field
          component={ButtonGroup}
          displayValue={props.value}
          mode={props.formContext.mode}
          name={props.name}
          options={props.conceptAnswers}
        />
      );
    }
  }
  else {
    return (
      <div>
        <Field
          component={FieldInput}
          displayValue={props.value}
          mode={props.formContext.mode}
          name={props.name}
          placeholder={props.placeholder}
          type={props.datatype}
          validate={props.validate}
          warn={props.warn}
        />
      </div>
    );
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
  widget: PropTypes.string
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

  const name = formUtil.obsFieldName(fullPath, concepts);

  return {
    name: name,
    value: props.formContext ? props.formContext.selector(state, name) : null
  };
};

export default withObsGroupContext(withFormContext(connect(mapStateToProps)(Obs)));
