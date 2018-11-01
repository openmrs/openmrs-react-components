import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientActions } from '../../features/patient';
import { LOCATION_TYPES } from '../../constants';
import '../../../assets/css/background.css';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(patientActions.clearSelectedPatient());
  }

  render() {
    return (
      <div
        className="background"
        style={{backgroundImage: this.props.homeImage? 'url(' + this.props.homeImage + ')' : ''}}
      />
    );
  }
}

HomePage.propTypes = {
  homeImage: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation
  };
};


export default connect(mapStateToProps)(HomePage);
