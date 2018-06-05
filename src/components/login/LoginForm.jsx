import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Row>
          <Col>
            <label>Username: </label>
            <Field
              component="input"
              name="username"
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Password: </label>
            <Field
              component="input"
              name="password"
              type="password"
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
                Submit
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};


export default reduxForm({
  form: 'login-form' // a unique identifier for this form
})(LoginForm);






