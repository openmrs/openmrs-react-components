import React from 'react';
import { Field } from 'redux-form';
import FieldInput from './FieldInput';

const Obs = (props) => {

  return (
    // TODO: type should be controlled based on datatype of concept
    <Field name={`obs|path=${props.path}|concept=${props.concept}`} type='number' component={FieldInput} />
  );

};

export default Obs;
