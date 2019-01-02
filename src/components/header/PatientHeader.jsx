import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Glyphicon } from 'react-bootstrap';
import { withRouter } from "react-router";
import { DATE_FORMAT } from "../../constants";
import patientUtil from '../../domain/patient/patientUtil';
import '../../../assets/css/patientHeader.css';

export class PatientHeader extends PureComponent {

  constructor(props) {
    super(props);
    // converts from REST rep but *only if necessary*; handles already-converted Patient object as well
    this.state = {
      patient: patientUtil.createFromRestRep(this.props.patient)
    };
  };

  componentWillReceiveProps(nextProps) {
    const { patient } = this.state;
    if (nextProps.patient.uuid !== patient.uuid) {
      this.setState({
        patient: patientUtil.createFromRestRep(this.props.patient),
      });
    }
  }

  renderDemographics() {

    return (
      <div className="demographics">
        <h2 className="name">
          <span>
            <span className="PersonName-givenName">{patientUtil.getGivenName(this.state.patient)},&nbsp;&nbsp;</span>
          </span>

          {
            patientUtil.getMiddleName(this.state.patient) &&
            <span>
              <span className="PersonName-middleName">{patientUtil.getMiddleName(this.state.patient)}&nbsp;&nbsp;</span>
            </span>
          }

          <span>
            <span className="PersonName-familyName">{patientUtil.getFamilyName(this.state.patient)}</span>
          </span>

          &nbsp;
          <span className="gender-age">
            <span className="gender">{this.state.patient.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
            <span className="age">
              {this.state.patient.age} year(s) { this.state.patient.birthdate ? ('(' + dateFns.format(new Date(this.state.patient.birthdate), DATE_FORMAT) + ')') : ''}
            </span>
          </span>
        </h2>
      </div>
    );
  }

  renderPatientIdentifier() {
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        {!this.props.identifierTypesToDisplay ? (
          <span>{patientUtil.getPreferredIdentifier(this.state.patient)}</span>
        ) : (
          <div className="identifiers-number">
            {this.props.identifierTypesToDisplay.map((identifierType) => {
              let identifier = patientUtil.getIdentifier(this.state.patient, identifierType);
              return identifier ? <span key={identifier}>{identifier}</span> : "";
            })}
          </div>
        )}
        <br />
      </div>
    );
  }

  render() {
    if (this.state.patient
      && (typeof this.state.patient !== 'undefined')
      && (typeof this.state.patient.name !== 'undefined') ) {
      return (
        <div>
          <div className="patient-header ">
            {this.props.showBackButton && <span 
              className="back-button" 
              onClick={() => this.props.history.push(this.props.backLink || '/')}
            >
              <Glyphicon
                className="back-button-icon"
                glyph="menu-left"
              /></span>}
            {this.state.patient && this.renderDemographics()}
            {this.state.patient && this.renderPatientIdentifier()}
          </div>
        </div>
      );
    }
    return null;
  }
}

PatientHeader.propTypes = {
  identifierTypesToDisplay: PropTypes.array,
  patient: PropTypes.shape({}),
  showBackButton: PropTypes.bool,
};

export default withRouter(PatientHeader);
