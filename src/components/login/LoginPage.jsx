import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';

const LoginPage = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (props.session.authenticated === true) {
    return <Redirect to={from} />;
  }
  else {
    return <Login />;
  }
};

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(LoginPage);


