import React from 'react';
import {  FormControl } from 'react-bootstrap';
import '../../../assets/css/loginForm.css';

const FieldInput = ({
                      input,
                      placeholder,
                      type,
                      meta: { touched, error, warning }
                    }) => {
  return (
    <div>
      <div>
        <FormControl {...input} placeholder={placeholder} type={type}/>
        {touched &&
        ((error &&
          <span className="field-error">
              {error}
            </span>) ||
          (warning &&
            <span className="field-warning">
                {warning}
              </span>))}
      </div>
    </div>
  );
};

export default FieldInput;



