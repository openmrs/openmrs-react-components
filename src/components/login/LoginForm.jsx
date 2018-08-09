import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {
  Select,
  TextField,
} from 'redux-form-material-ui';

import Errors from '../errors/Errors';


let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, locations } = props;

  return (
    <div>
      <div>
        <Typography variant="headline">Login</Typography>
      </div>
      <Errors />

      <div>

        <form onSubmit={handleSubmit}>
          <div>
            <Field name="username" component={TextField} label="Username" type="text" />
          </div>
          <div>
            <Field name="password" component={TextField} label="Password" type="password"/>
          </div>
          <div>
            <Field name="location" component={Select}>
              { locations.map(option =>
                <MenuItem key={option.uuid} value={option.uuid}>{option.display}</MenuItem>
              )}
            </Field>
          </div>
          <div>
            <Button size="large" variant="contained" disabled={pristine || submitting} type="submit">Submit</Button>
            <Button size="large" variant="contained" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
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



