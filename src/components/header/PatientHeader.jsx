import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../../../assets/css/patientHeader.css';

import dateFns from 'date-fns';

export class PatientHeader extends PureComponent {
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
    const {
      props: {
        patient: {
          person,
          patientId,
          attributes,
        }
      },
      state: {
        showContactInfo
      }
    } = this;
    return (
      <div className="demographics">
        <h1 className="name">
          <span>
            <span className="PersonName-givenName">{person.personName.givenName}&nbsp;&nbsp;</span>
            <em>Given</em>
          </span>
  
          {
            person.personName.middleName &&
            <span>
              <span className="PersonName-middleName">{person.personName.middleName}&nbsp;&nbsp;</span>
              <em>Middle</em>
            </span>
          }
  
          <span>
            <span className="PersonName-familyName">{person.personName.familyName}</span>
            <em>Family Name</em>
          </span>
  
          &nbsp;
          <span className="gender-age">
            <span>{person.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
            <span>
              {person.age} year(s) ({dateFns.format(new Date(person.birthdate), 'DD[.]MMM[.]YYYY')})
            </span>
            <span
              className="edit-info"
              id="edit-patient-demographics"
            >
              <small>
                <a href={`../../registrationapp/editSection.page?patientId=${patientId}&sectionId=demographics&appId=referenceapplication.registrationapp.registerPatient`}>Edit</a>
              </small>
            </span>
            <a
              className="contact-info-label expanded"
              id="patient-header-contactInfo"
              onClick={() => { this.toggleDetailsView(); }}
              role="button"
              tabIndex="0"
            >
              {showContactInfo ?
                <span>Hide Contact Info <i className="toggle-icon icon-caret-up small" /></span> :
                <span>Show contact info <i className="toggle-icon icon-caret-up small rotate180" /></span>
              }
            </a>
          </span>
  
          <div className="firstLineFragments" />
  
          {showContactInfo &&
          <div
            className=""
            id="contactInfoContent"
          >
            <div className="contact-info-inline">
              <span>
                {person.preferredAddress.display}
                {person.preferredAddress.cityVillage && ` , ${person.preferredAddress.cityVillage}`}
                {person.preferredAddress.stateProvince && `,${person.preferredAddress.stateProvince}`}
                {person.preferredAddress.country && `,${person.preferredAddress.country}`}
                {person.preferredAddress.postalCode && `,${person.preferredAddress.postalCode}`}
                <em>Address</em>
              </span>
              <span className="left-margin">
                <span id="coreapps-telephoneNumber">
                  {attributes[0] ? attributes[0].value : ''}
                </span>
                <em>Telephone Number</em>
              </span>
                &nbsp;&nbsp;
              <small
                className="edit-info"
                id="contact-info-inline-edit"
              >
                <a
                  href={`../../registrationapp/editSection.page?patientId=${patientId}&sectionId=contactInfo&appId=referenceapplication.registrationapp.registerPatient`}
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
    const { patient } = this.props;
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        <span>{patient.patientIdentifier.identifier}</span>
        <br />
      </div>
    );
  }

  render() {
    const {
      patient
    } = this.props;
    return (
      <div>
        <div className="patient-header ">
          {patient && this.renderDemographics()}
          {patient && this.renderPatientIdentifier()}
        </div>
      </div>
    );
  }
}

PatientHeader.propTypes = {
  patient: PropTypes.shape({}).isRequired,
};

export default PatientHeader;
