import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS } from "../../actions/types"
import LoginForm from './LoginForm';

class Login extends React.Component {

  // https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

  constructor(props) {
    super(props);
    this.requestLogin = this.requestLogin.bind(this);
  }

  requestLogin(values) {
    this.props.dispatch({ type: LOGIN_ACTIONS.REQUESTED , username: values.username, password: values.password });
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={ this.requestLogin  }/>
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

