import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginActions } from '../../features/login';
import { errorsActions } from '../../features/errors';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    this.props.dispatch(errorsActions.clearErrors());
    this.props.dispatch(loginActions.login(values.username, values.password, values.location));
  }

  componentDidMount() {
    this.props.dispatch(loginActions.getLoginLocations());
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

