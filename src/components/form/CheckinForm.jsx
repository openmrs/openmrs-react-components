import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../uicommons';
import { Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';

let CheckinForm = props => {

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <div>
      <h3><Label>Check-in</Label></h3>
      <Form horizontal onSubmit={ handleSubmit }>
        <Grid>

          <Row>
            <FormGroup controlId="formIdentifier">
              <Col componentClass={ControlLabel} sm={2}>
                Identifier
              </Col>
              <Col sm={4}>
                <Field name="identifier" type='text' component={FieldInput} placeholder="Identifier"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formFirstName">
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col sm={4}>
                <Field name="firstName" type='text' component={FieldInput} placeholder="First Name"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formLastName">
              <Col componentClass={ControlLabel} sm={2}>
                Last Name
              </Col>
              <Col sm={4}>
                <Field name="lastName" type='text' component={FieldInput} placeholder="Last Name"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formGender">
              <Col componentClass={ControlLabel} sm={2}>
                Gender
              </Col>
              <Col sm={4}>
                <Field name="gender" type='text' component={FieldInput} placeholder="Gender"  />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formAge">
              <Col componentClass={ControlLabel} sm={2}>
                Age
              </Col>
              <Col sm={4}>
                <Field name="age" type='number' component={FieldInput} placeholder="Age"  />
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
                    disabled={ submitting }
                    type="submit"
                  >
                    Check-in
                  </Button>


                  <Button
                    bsStyle="danger"
                    bsSize="large"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Cancel
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


CheckinForm = reduxForm({
  form: 'checkInForm', // a unique identifier for this form
})(CheckinForm);

CheckinForm = connect(
  state => ({
    initialValues: state.selected.patient,
  })
)(CheckinForm);

export default CheckinForm;

