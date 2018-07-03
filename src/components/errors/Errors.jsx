import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class Errors extends React.Component {

  render() {
    let errorMessages = null;

    if (this.props.errors) {
      errorMessages = this.props.errors.map((e, i) => {
        return (<Alert key={ i }>{ e.message }</Alert>);
      });
    }

    if (errorMessages) {
      return(
        <div>
          { errorMessages }
        </div>
      );
    }
    else {
      return null;
    }
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.openmrs ? state.openmrs.errors : null
  };
};

export default connect(mapStateToProps)(Errors);
