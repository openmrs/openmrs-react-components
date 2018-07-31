import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../form/FieldInput';
import Errors from '../errors/Errors';
import { Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Label } from 'react-bootstrap';


let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, locations } = props;

  const Select = ({ input, options, disabled }) => (
    <div>
      <select {...input} disabled={disabled}>
        { options.map(option =>
          <option key={option.uuid} value={option.uuid}>
            {option.display}
          </option>
        )}
      </select>

    </div>
  );

  return (
    <div>
      <h3><Label>Login</Label></h3>
      <Errors/>
      <Form horizontal onSubmit={handleSubmit}>
        <Grid>

          <Row>
            <FormGroup controlId="formUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <Field name="username" type='text' component={FieldInput} placeholder="username"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <Field name="password" type='password' component={FieldInput} placeholder="password"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formLocationSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Location
              </Col>
              <Col sm={4}>
                <Field name="location" options={ locations } component={Select} >

                </Field>

              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formSubmit">
            <Col smOffset={2} sm={4}>
            <ButtonToolbar>
                <Button
                  bsStyle="success"
                  bsSize="large"
                  disabled={pristine || submitting}
                  type="submit"
                >
                  Submit
                </Button>


                <Button
                  bsStyle="danger"
                  bsSize="large"
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
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  locations: PropTypes.array.isRequired
};


LoginForm = reduxForm({
  form: 'login-form'  // a unique identifier for this form
})(LoginForm);

let mapStateToProps = (state) => {
  return {
    locations: state.openmrs.loginLocations.list ? state.openmrs.loginLocations.list : [],
  };
};


export default connect(mapStateToProps)(LoginForm);



