import React from 'react';
import {  FormControl } from 'react-bootstrap';

const FieldInput = ({ input, type, componentClass, placeholder, min, max }) => {
  return (
    <FormControl
      type={type}
      componentClass={componentClass}
      placeholder={placeholder}
      min={min}
      max={max}
      value={input.value}
      onChange={input.onChange}
    />
  );
};

export default FieldInput;



