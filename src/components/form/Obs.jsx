import React from 'react';
import { Field } from 'redux-form';
import ButtonGroup from './ButtonGroup';
import DropDown from './DropDown';
import FieldInput from "./FieldInput";

const Obs = (props) => {

  if ( typeof props.conceptAnswers !== 'undefined' ) {
    if (props.displayComponent === 'dropdown') {
      return (
        <Field
          component={DropDown}
          name={`obs|path=${props.path}|concept=${props.concept}`}
          options={props.conceptAnswers}
        />);
    } else {
      return (
        <Field
          component={ButtonGroup}
          name={`obs|path=${props.path}|concept=${props.concept}`}
          options={props.conceptAnswers}
        />);
    }
  } else if ( typeof props.datatype !== 'undefined' && props.datatype === 'text') {
    return (
      // TODO: type should be controlled based on datatype of concept
      <Field
        component={FieldInput}
        name={`obs|path=${props.path}|concept=${props.concept}`}
        placeholder={props.placeholder}
        type='text'
        validate={props.validate}
        warn={props.warn} 
      />
    );
  } else {
    return (
      // TODO: type should be controlled based on datatype of concept
      <Field
        component={FieldInput}
        name={`obs|path=${props.path}|concept=${props.concept}`}
        placeholder={props.placeholder}
        type='number'
        validate={props.validate}
        warn={props.warn}
      />
    );
  }

};

export default Obs;
