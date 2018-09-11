import React from 'react';
import { Field } from 'redux-form';
import RenderField from './RenderField';
import ButtonGroup from './ButtonGroup';

const Obs = (props) => {

  if ( typeof props.conceptAnswers !== 'undefined' ) {
    return (
      <Field name={`obs|path=${props.path}|concept=${props.concept}`} component={ ButtonGroup } options={ props.conceptAnswers }/>
    );
  } else {
    return (
      // TODO: type should be controlled based on datatype of concept
      <Field
        name={`obs|path=${props.path}|concept=${props.concept}`}
        type='number'
        component={RenderField}
        placeholder={ props.placeholder }
        validate={ props.validate }
        warn={ props.warn }/>
    )
  }

};

export default Obs;
