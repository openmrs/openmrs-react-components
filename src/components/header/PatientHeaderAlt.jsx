import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../assets/css/patientHeader.css';
import patientUtil from '../../domain/patient/patientUtil';

import dateFns from 'date-fns';

export class PatientHeaderAlt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showContactInfo: false,
    };
  }

  toggleDetailsView = () => {
    this.setState(() => ({
      showContactInfo: !this.state.showContactInfo,
    }));
  };

  renderDemographics() {
    let patient = this.props.patient;
    return (
      <div className="demographics">
        <h1 className="name">
          <span>
            <span className="PersonName-givenName">{patientUtil.getGivenName(patient)}&nbsp;&nbsp;</span>
            <em>Given</em>
          </span>

          {
            patientUtil.getMiddleName(patient) &&
            <span>
              <span className="PersonName-middleName">{patientUtil.getMiddleName(patient)}&nbsp;&nbsp;</span>
              <em>Middle</em>
            </span>
          }

          <span>
            <span className="PersonName-familyName">{patientUtil.getFamilyName(patient)}</span>
            <em>Family Name</em>
          </span>

          &nbsp;
          <span className="gender-age">
            <span>{patient.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
            <span>
              {patient.age} year(s) ({dateFns.format(new Date(patient.birthdate), 'DD[.]MMM[.]YYYY')})
            </span>
            <span
              className="edit-info"
              id="edit-patient-demographics"
            >
              <small>
                <a href={`../../registrationapp/editSection.page?patientId=${patient.id}&sectionId=demographics&appId=referenceapplication.registrationapp.registerPatient`}>Edit</a>
              </small>
            </span>
            <a
              className="contact-info-label expanded"
              id="patient-header-contactInfo"
              onClick={() => { this.toggleDetailsView(); }}
              role="button"
              tabIndex="0"
            >
              {this.state.showContactInfo ?
                <span>Hide Contact Info <i className="toggle-icon icon-caret-up small" /></span> :
                <span>Show contact info <i className="toggle-icon icon-caret-up small rotate180" /></span>
              }
            </a>
          </span>

          <div className="firstLineFragments" />

          {this.state.showContactInfo &&
          <div
            className=""
            id="contactInfoContent"
          >
            <div className="contact-info-inline">
              <span>
                {patientUtil.getAddressDisplay(patient)}
                {patientUtil.getCityVillage(patient) && ` , ${patientUtil.getCityVillage(patient)}`}
                {patientUtil.getStateProvince(patient) && `,${patientUtil.getStateProvince(patient)}`}
                {patientUtil.getCountry(patient) && `,${patientUtil.getCountry(patient)}`}
                {patientUtil.getPostalCode(patient) && `,${patientUtil.getPostalCode(patient)}`}
                <em>Address</em>
              </span>
              <span className="left-margin">
                <span id="coreapps-telephoneNumber">
                  {patientUtil.getTelephoneNumber(patient)}
                </span>
                <em>Telephone Number</em>
              </span>
              &nbsp;&nbsp;
              <small
                className="edit-info"
                id="contact-info-inline-edit"
              >
                <a
                  href={`../../registrationapp/editSection.page?patientId=${patient.id}&sectionId=contactInfo&appId=referenceapplication.registrationapp.registerPatient`}
                >
                  Edit
                </a>
              </small>
            </div>
          </div>
          }
        </h1>
      </div>
    );
  }

  renderPatientIdentifier() {
    let patient = this.props.patient;
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        <span>{patient.identifiers[0].identifier}</span>
        <br />
      </div>
    );
  }

  render() {
    const { patient } = this.props;
    if ( patient
      && (typeof patient !== 'undefined')
      && (typeof patient.name !== 'undefined') ) {
      return (
        <div>
          <div className="patient-header ">
            {patient && this.renderDemographics()}
            {patient && this.renderPatientIdentifier()}
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
});

PatientHeaderAlt.propTypes = {
  patient: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(PatientHeaderAlt);
