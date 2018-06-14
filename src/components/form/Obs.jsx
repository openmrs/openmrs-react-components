import React from 'react';
import { Field } from 'redux-form';
import { FormControl } from 'react-bootstrap';

const FieldInput = ({ input, meta, type, placeholder, min, max }) => {
  return (
    <FormControl
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      value={input.value}
      onChange={input.onChange} />
  );
};


const Obs = (props) => {

  return (
    <Field name={`obs|path=${props.path}|concept=${props.concept}`} type='text' component={FieldInput} />
  );

};

export default Obs;
