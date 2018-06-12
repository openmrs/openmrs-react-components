import React from 'react';
import PropTypes from "prop-types";
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';


const PatientSearchForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Row>
          <Col>
            <label>Search: </label>
            <Field
              component="input"
              name="query"
              type="text"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <ButtonToolbar>
              <Button
                bsStyle="success"
                disabled={pristine || submitting}
                type="submit"
              >
                Search
              </Button>
              <Button
                bsStyle="danger"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    </form>
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
