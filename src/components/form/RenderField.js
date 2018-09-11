import React from 'react';
import '../../../assets/css/loginForm.css';
import { FormControl } from 'react-bootstrap';

const RenderField = ({
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
}

export default RenderField;
