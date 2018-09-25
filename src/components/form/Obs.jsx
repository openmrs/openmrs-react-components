import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContext from './FormContext';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';

const Obs = (props) => {

  const conceptAnswerDisplay = (value, conceptAnswers) => {
    if (value) {
      const matchingAnswer = conceptAnswers.find(ans => ans.uuid === value);
      return matchingAnswer ? matchingAnswer.name : null;
    }
    else {
      return null;
    }
  };

  const name = `obs|path=${props.path}|concept=${props.concept}`;

  // TODO: type should be controlled based on datatype of concept
  if (props.datatype === 'date') {
    return (
      <Field
        component={CustomDatePicker}
        name={name}
        validate={props.validate}
      />
    );
  }
  else if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.widget === 'dropdown') {
      return (
        <FormContext.Consumer>
          { context => context.mode === 'edit' ?
            (<Field
              component={Dropdown}
              list={props.conceptAnswers}
              name={name}
              title={props.dropDownTitle}
            />) :
            (
              <span>{conceptAnswerDisplay(context.selector(props.state, name), props.conceptAnswers)}</span>
            ) }
        </FormContext.Consumer>
      );
    } else if (props.widget === 'checkbox') {
      return (
        <Field
          component={CheckBox}
          name={name}
          options={props.conceptAnswer}
          title={props.checkBoxTitle}
        />
      );
    } else {
      return (
        <FormContext.Consumer>
          { context => context.mode === 'edit' ?
            (<Field
              component={ButtonGroup}
              name={name}
              options={props.conceptAnswers}
            />) :
            (
              <span>{conceptAnswerDisplay(context.selector(props.state, name), props.conceptAnswers)}</span>
            ) }
        </FormContext.Consumer>
      );
    }
  } else {
    return (
      <FormContext.Consumer>
        { context => context.mode === 'edit' ?
          (<Field
            component={FieldInput}
            name={name}
            placeholder={props.placeholder}
            type={props.datatype}
            validate={props.validate}
            value={props.value}
            warn={props.warn}
          />) :
          (
            <span>{context.selector(props.state, name)} </span>
          )}
      </FormContext.Consumer>
    )
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

// TODO seems like this must be bad, maps in the entire state! could we restrict to the form at least? get access to the selector somehow?
const mapStateToProps = (state) => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(Obs);
