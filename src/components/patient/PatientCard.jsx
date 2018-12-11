import React from 'react';
import moment from 'moment';

const PatientCard = (patient, index, onRowSelected, getPatientIdentifiers) => (
  <div 
    className="card-list"
    key={index} 
    onClick={() => onRowSelected(patient)}>
    <div className="left-items">
      <span className="name">
        <span className="given-name">{patient.name && patient.name.givenName && patient.name.givenName}</span>
        <span className="family-name">{patient.name && patient.name.familyName && patient.name.familyName}</span>
      </span>
      <span className="gender-age">
        <span className="gender">{patient.gender && patient.gender === 'M' ? "Male" : "Female"}</span>
        <span className="age">{patient.age && patient.age} yrs old</span>
        <span className="dob">({patient.birthdate && moment(patient.birthdate).format('DD, MMM, YYYY')})</span>
      </span>
    </div>
    <div className="right-items">
      {getPatientIdentifiers(patient) && getPatientIdentifiers(patient).split('<br/>').map((identifier, index) => (
        <span key={index}>{identifier}</span>
      ))}
    </div>
  </div>
);

export default PatientCard;
