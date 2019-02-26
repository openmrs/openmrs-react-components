import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import FieldInput from '../widgets/FieldInput';
import Errors from '../errors/Errors';
import '../../../assets/css/loginForm.css';
import { Button } from 'react-bootstrap';


let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, locations, isFormComplete } = props;


  const Select = ({ input, id, options, disabled, placeholder }) => (
    <div>
      <select {...input} id={id} disabled={disabled} className="locationSelector">
        <option key={0} value={''}>{placeholder}</option>
        { options.map(option =>
          <option key={option.uuid} value={option.uuid}>
            {option.display}
          </option>
        )}
      </select>

    </div>
  );

  return(
    <form className="panel" onSubmit={handleSubmit} >
        <Errors />
      <div className="midPanelItemContainer">
        <Field
          name="username" id="username" type='text' component={FieldInput} placeholder="Username"  />
      </div>
      <div className="midPanelItemContainer">
        <Field
          name="password" id="password" type='password' component={FieldInput} placeholder="Password"  />
      </div>
      <div className="midPanelItemContainer">
        <Field
          name="location"
          id="location"
          options={ locations }
          component={ Select }
          placeholder="Select Location"
        />
      </div>
      <div className="bottomPanelItemContainer">
        <Button className="loginButton"
          disabled={pristine || submitting || !isFormComplete}
          type="submit"
        >
          Login
        </Button>
      </div>
    </form>
  );

};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

LoginForm = reduxForm({
  form: 'login-form-alt'  // a unique identifier for this form
})(LoginForm);

const selector = formValueSelector('login-form-alt');

export default connect(state => {
  const { username, password, location } = selector(state, 'username', 'password', 'location');
  const isFormComplete = ( username !== undefined ) && ( password !== undefined) && ( location !== undefined) ;

  return {
    isFormComplete,
    locations: state.openmrs.loginLocations.list ? state.openmrs.loginLocations.list : [],
  };
})(LoginForm);



