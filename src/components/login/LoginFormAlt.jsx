import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import FieldInput from '../form/FieldInput';
import Errors from '../errors/Errors';
import '../../../assets/css/loginForm.css';
import { Button, ButtonToolbar, Grid, Row, Col, Form, FormControl, HelpBlock, FormGroup, ControlLabel, Label } from 'react-bootstrap';


let LoginFormAlt = props => {
  const { handleSubmit, pristine, reset, submitting, locations, isFormComplete } = props;


  const Select = ({ input, options, disabled, placeholder }) => (
    <div>
      <select {...input} disabled={disabled} class="locationSelector">
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
        <Button
          type="submit"
          disabled={pristine || submitting || !isFormComplete}
        >
          Login
        </Button>
      </div>
    </form>
  );

};

LoginFormAlt.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  locations: PropTypes.array.isRequired
};

LoginFormAlt = reduxForm({
  form: 'login-form-alt'  // a unique identifier for this form
})(LoginFormAlt);

const selector = formValueSelector('login-form-alt');

export default connect(state => {
  const { username, password, location } = selector(state, 'username', 'password', 'location');
  const isFormComplete = ( username !== undefined ) && ( password !== undefined) && ( location !== undefined) ;

  return {
    isFormComplete,
    locations: state.openmrs.loginLocations.list ? state.openmrs.loginLocations.list : [],
  };
})(LoginFormAlt);



