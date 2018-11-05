import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';
import '../../../assets/css/LoginPage.css';
import '../../../assets/css/background.css';

const LoginPage = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (props.session.authenticated === true) {
    return <Redirect to={from} />;
  }
  else {
    return(
      <div class="background darken-pseudo" style={{backgroundImage: props.homeImage? 'url(' + props.homeImage + ')' : ''}}>
        <div class="foreground">
          {props.logo && (
            <img className="loginLogo" src={props.logo} alt=''/>)
          }
          <Login/>
        </div>
      </div>
    );
  }
};

LoginPage.propTypes = {
  homeImage: PropTypes.string,
  location: PropTypes.object.isRequired,
  logo: PropTypes.string,
  session: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(LoginPage);
