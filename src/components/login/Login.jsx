import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginActions } from '../../features/login';
import { errorsActions } from '../../features/errors';

class Login extends React.Component {

  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    this.props.dispatch(errorsActions.clearErrors());
    this.props.dispatch(loginActions.login(values.username, values.password));
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default connect()(Login);

