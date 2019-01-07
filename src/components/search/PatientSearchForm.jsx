import React from 'react';
import PropTypes from "prop-types";
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Grid, Row, Col, ControlLabel, Glyphicon, FormControl } from 'react-bootstrap';

const leftTextAlign = {
  textAlign: "left"
};
const colHeight = {
  height: '10px'
};
const inputSearchStyle = {
  width: "-webkit-fill-available",
  height: "30px"
};

const patientSearchInput = (field) => {
  return (
  <div className="name-filter-container">
    <span className="name-filter">
      <Glyphicon
        className="left-icon"
        glyph="search"
      />
      <FormControl
        placeholder="search by text"
        type="text"
        {...field.input}
      />           
      <Glyphicon 
        className="right-icon"
        glyph="remove-sign" 
        onClick={() => {}}
      />
    </span>
</div>
);
  }

class PatientSearchForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onSubmit(e.target.value);
  }

  render() {

    return (
      <div>
        <Field
          component={patientSearchInput}
          name="query"
          onChange={this.handleChange}
        />
      </div>
  
    );
  };
}

PatientSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'search-form' // a unique identifier for this form
})(PatientSearchForm);
