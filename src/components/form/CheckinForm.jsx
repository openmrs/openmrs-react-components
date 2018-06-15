import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let CheckinForm = props => {

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <div>
      <form onSubmit={ handleSubmit }>

        <div>
          <label>First Name</label>
          <div>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>

        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label>Age</label>
          <div>
            <Field
              name="age"
              component="input"
              type="text"
              placeholder="age"
            />
          </div>
        </div>

        <div>
          <button type="submit" disabled={ submitting }>Check-In</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>
      </form>
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

