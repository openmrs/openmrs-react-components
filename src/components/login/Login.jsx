import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class Login extends React.Component {

  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

  handleSubmit() {
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGIN_REQUESTED });
  }

  render() {
    return (
      <LoginForm />
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default connect()(Login);

