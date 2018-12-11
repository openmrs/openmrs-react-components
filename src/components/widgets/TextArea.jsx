import React from 'react';
import PropTypes from 'prop-types';
import {  FormControl } from 'react-bootstrap';
import '../../../assets/css/widgets.css';

const TextArea = ({
  input,
  mode,
  placeholder,
  displayValue,
}) => {

  const edit = (
    <FormControl
      {...input}
      componentClass="textarea"
      placeholder={placeholder}
    />
  );

  const view = (
    <span
      className="textarea-input-view"
    >
      {displayValue}
    </span>
  );

  return (
    <div>
      {!mode || mode === 'edit' ? edit : view}
    </div>
  );

};

TextArea.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default TextArea;



