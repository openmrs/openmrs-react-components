import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <div>
          <Field
            component="input"
            name="username"
            type="text"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            component="input"
            name="password"
            type="password"
          />
        </div>
      </div>

      <div>
        <button
          disabled={pristine || submitting}
          type="submit"
        >
          Submit
        </button>
        <button
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
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






