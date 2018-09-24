import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';
import { EncounterFormContext } from './EncounterForm';

const Obs = (props) => {

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
        <EncounterFormContext.Consumer>
          { context => context.mode === 'edit' ?
            (<Field
              component={Dropdown}
              list={props.conceptAnswers}
              name={name}
              title={props.dropDownTitle}
            />) :
            (
              <span>{context.initialData ? props.conceptAnswers.find(ans => ans.uuid === context.initialData[name]).name : null}</span>
            ) }
        </EncounterFormContext.Consumer>
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
        <EncounterFormContext.Consumer>
          { context => context.mode === 'edit' ?
            (<Field
              component={ButtonGroup}
              name={name}
              options={props.conceptAnswers}
            />) :
            (
              <span>{context.initialData ? props.conceptAnswers.find(ans => ans.uuid === context.initialData[name]).name : null}</span>
            ) }
        </EncounterFormContext.Consumer>
      );
    }
  } else {
    return (
      <EncounterFormContext.Consumer>
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
            <span>{context.initialData ? context.initialData[name] : null}</span>
          )}
      </EncounterFormContext.Consumer>
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

export default Obs;
