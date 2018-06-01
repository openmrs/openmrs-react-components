import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// adapted from: https://reacttraining.com/react-router/web/example/auth-workflow
// will redirect to a Login Page if user is not authenicated
// see sample/App.js for example of usage

const AuthenicatedRoute = props => {

  if (props.session.authenticated === true) {
    return (
      <Route
        component={props.component}
        path={props.path}
      />
    );
  }
  else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
    );
  }

};

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(AuthenicatedRoute);
