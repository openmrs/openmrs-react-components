import React from 'react';
import { format } from 'date-fns';
import {DATE_FORMAT} from "../../constants";

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
        <span className="dob">({patient.birthdate && format(patient.birthdate, DATE_FORMAT)})</span>
      </span>
      { ( typeof patient.alert !== 'undefined' ) &&
                      ( patient.alert !== null ) &&
                      ( patient.alert.length > 0  ) &&
      <span className="patient-alert">
        { patient.alert.map((alert, index) => (
          <span key={index}>{alert}</span>
        ))}
      </span>
      }
    </div>
    <div className="right-items">
      {getPatientIdentifiers(patient) && getPatientIdentifiers(patient).split('<br/>').map((identifier, index) => (
        <span key={index}>{identifier}</span>
      ))}
    </div>
  </div>
);

export default PatientCard;
