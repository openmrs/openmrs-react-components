import React from 'react';
import PropTypes from "prop-types";
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar, Form, FormGroup, Grid, Row, Col, ControlLabel } from 'react-bootstrap';


const PatientSearchForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Grid>

        <Row>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Search
            </Col>
            <Col>
              <Field
                component="input"
                name="query"
                type="text"
              />
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup>
            <Col>
              <ButtonToolbar>
                <Button
                  bsSize="large"
                  bsStyle="success"
                  disabled={pristine || submitting}
                  type="submit"
                >
                  Search
                </Button>
                <Button
                  bsSize="large"
                  bsStyle="danger"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Clear Values
                </Button>
              </ButtonToolbar>
            </Col>
          </FormGroup>
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
