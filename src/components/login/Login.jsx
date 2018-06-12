import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {loginActions} from '../../features/login';

class Login extends React.Component {

  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    this.props.dispatch(loginActions.login(values.username, values.password));
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleLogin}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { dispatch: state.dispatch };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);

