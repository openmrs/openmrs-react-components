import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Errors from '../errors/Errors';


let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, locations } = props;

  const renderSelect = ({
    input,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <Select
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );

  const renderTextField = ({
    input,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      {...input}
      {...custom}
    />
  );


  return (
    <div>
      <div>
        <Typography variant="headline">Login</Typography>
      </div>
      <Errors />

      <div>

        <form onSubmit={handleSubmit}>
          <div>
            <Field name="username" component={renderTextField} label="Username" type="text" />
          </div>
          <div>
            <Field name="password" component={renderTextField} label="Password" type="password"/>
          </div>
          <div>
            <FormControl>
              <InputLabel>Location</InputLabel>
              <Field id="location" name="location" options={ locations } component={renderSelect}>
                <MenuItem value="" />
                { locations.map(option =>
                  <MenuItem key={option.uuid} value={option.uuid}>{option.display}</MenuItem>
                )}
              </Field>
            </FormControl>
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



