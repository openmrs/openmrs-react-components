import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from 'react-bootstrap';

class Errors extends React.Component {

  render() {
    let errorMessages = null;

    if (this.props.errors) {
      const uniqueErrorMessage = [...new Set(this.props.errors.map(error => error.message))];
      errorMessages = uniqueErrorMessage.map((e, i) => {
        return (<Alert key={ i }>{ e }</Alert>);
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
