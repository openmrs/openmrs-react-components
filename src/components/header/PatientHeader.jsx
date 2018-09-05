import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import patientUtil from '../../domain/patient/patientUtil';
import '../../../assets/css/patientHeader.css';

export class PatientHeader extends PureComponent {
  constructor(props) {
    super(props);
    // converts from REST rep but *only if necessary*; handles already-converted Patient object as well
    this.patient = patientUtil.createFromRestRep(this.props.patient);
  };

  renderDemographics() {

    return (
      <div className="demographics">
        <h1 className="name">
          <span>
            <span className="PersonName-givenName">{patientUtil.getGivenName(this.patient)}&nbsp;&nbsp;</span>
            <em>Given</em>
          </span>

          {
            patientUtil.getMiddleName(this.patient) &&
            <span>
              <span className="PersonName-middleName">{patientUtil.getMiddleName(this.patient)}&nbsp;&nbsp;</span>
              <em>Middle</em>
            </span>
          }

          <span>
            <span className="PersonName-familyName">{patientUtil.getFamilyName(this.patient)}</span>
            <em>Family Name</em>
          </span>

          &nbsp;
          <span className="gender-age">
            <span className="gender">{this.patient.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
            <span className="age">
              {this.patient.age} year(s) ({dateFns.format(new Date(this.patient.birthdate), 'DD MMM YYYY')})
            </span>
          </span>
        </h1>
      </div>
    );
  }

  renderPatientIdentifier() {
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        {!this.props.identifierTypesToDisplay ? (
          <span>{patientUtil.getPreferredIdentifier(this.patient)}</span>
        ) : (
          this.props.identifierTypesToDisplay.map((identifierType) => {
            let identifier = patientUtil.getIdentifier(this.patient, identifierType);
            return identifier ? <span key="{identifier}">{identifier}</span> : "";
          })
        )}
        <br />
      </div>
    );
  }

  render() {
    if (this.patient
      && (typeof this.patient !== 'undefined')
      && (typeof this.patient.name !== 'undefined') ) {
      return (
        <div>
          <div className="patient-header ">
            {this.patient && this.renderDemographics()}
            {this.patient && this.renderPatientIdentifier()}
          </div>
        </div>
      );
    }
    return null;
  }
}

PatientHeader.propTypes = {
  identifierTypesToDisplay: PropTypes.array,
  patient: PropTypes.shape({})
};

export default PatientHeader;
