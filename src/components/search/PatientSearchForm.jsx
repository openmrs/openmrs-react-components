import React from 'react';
import PropTypes from "prop-types";
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Grid, Row, Col, ControlLabel } from 'react-bootstrap';

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

const PatientSearchForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Grid>
        <Row>
          <FormGroup controlId="searchLabel">
            <Col sm={ 3 } componentClass={ControlLabel}>
              Search Patients
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup controlId="searchLabel">
            <Col sm={ 3 }>
              <Field
                component="input"
                name="query"
                type="text"
                style={ inputSearchStyle }
                placeholder="enter name or id"
              />
            </Col>
            <Col sm={2} style={ leftTextAlign }>
              <Button
                bsStyle="primary"
                bsSize="small"
                disabled={pristine || submitting}
                type="submit">
                Search
              </Button>
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <Col sm={20} md={20} style={ colHeight }>
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>

      </Grid>
    </Form>
  );
};

PatientSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'search-form' // a unique identifier for this form
})(PatientSearchForm);
