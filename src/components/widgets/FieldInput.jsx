import React from 'react';
import PropTypes from 'prop-types';
import {  FormControl } from 'react-bootstrap';
import '../../../assets/css/widgets.css';

const FieldInput = ({
  input,
  mode,
  placeholder,
  displayValue,
  type,
  meta: { touched, error, warning }
}) => {

  const edit = (
    <FormControl
      {...input}
      placeholder={placeholder}
      type={type}
    />
  );

  const view = (
    <span
      className="field-input-view"
    >
      {displayValue}
    </span>
  );

  const validations = (
    <div className="div-error">
      {error && (
        <span className="field-error" style={{ visibility: error ? "visible" : "hidden"}}>
          { error ? error : "_" }
        </span>
      )}
      {warning && (
        <span className="field-warning" style={{ visibility: warning ? "visible" : "hidden"}}>
          { warning ? warning : "_" }
        </span>)
      }
    </div>
  );

  return (
    <div>
      {!mode || mode === 'edit' ? edit : view}
      {validations}
    </div>
  );

};

FieldInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default FieldInput;



