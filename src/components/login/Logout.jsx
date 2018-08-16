import React from 'react';
import { connect } from 'react-redux';
import { loginActions } from '../../features/login';
import { errorsActions } from '../../features/errors';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogout();
  }

  handleLogout() {
    this.props.dispatch(errorsActions.clearErrors());
    this.props.dispatch(loginActions.logout());
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
}

export default connect()(Logout);
