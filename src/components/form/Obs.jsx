import React from 'react';
import { Field } from 'redux-form';
import ButtonGroup from './ButtonGroup';
import FieldInput from "./FieldInput";

const Obs = (props) => {

  if ( typeof props.conceptAnswers !== 'undefined' ) {
    return (
      <Field
        name={`obs|path=${props.path}|concept=${props.concept}`}
        component={ ButtonGroup }
        options={ props.conceptAnswers } />
    );
  } else if ( typeof props.datatype !== 'undefined' && props.datatype === 'text') {
    return (
      // TODO: type should be controlled based on datatype of concept
      <Field
        name={`obs|path=${props.path}|concept=${props.concept}`}
        type='text'
        component={ FieldInput }
        placeholder={ props.placeholder }
        validate={ props.validate }
        warn={ props.warn }/>
    )
  } else {
    return (
      // TODO: type should be controlled based on datatype of concept
      <Field
        name={`obs|path=${props.path}|concept=${props.concept}`}
        type='number'
        component={ FieldInput }
        placeholder={ props.placeholder }
        validate={ props.validate }
        warn={ props.warn } />
    )
  }

};

export default Obs;
