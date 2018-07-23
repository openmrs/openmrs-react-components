import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import View from './View';
// import BreadCrumb from '../breadCrumb';
// import { fetchPatientRecord, fetchPatientNote } from '../../actions/patient';

import dateFns, { distanceInWordsToNow } from 'date-fns';

const View = ({
  patient: {
    person, patientId, attributes, patientIdentifier,
  }, toggleDetailsView, showContactInfo, note,
}) => (
  <div className="patient-header ">
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
            {/* {person.age} year(s) ({dateFns.format(new Date(person.birthdate), 'DD[.]MMM[.]YYYY')}) */}
          </span>
          <span id="edit-patient-demographics" className="edit-info">
            <small>
              <a href={`../../registrationapp/editSection.page?patientId=${patientId}&sectionId=demographics&appId=referenceapplication.registrationapp.registerPatient`}>Edit</a>
            </small>
          </span>
          <a
            role="button"
            tabIndex="0"
            onClick={() => { toggleDetailsView(); }}
            id="patient-header-contactInfo" className="contact-info-label expanded"
          >
            {showContactInfo ?
              <span>Hide Contact Info <i className="toggle-icon icon-caret-up small" /></span> :
              <span>Show contact info <i className="toggle-icon icon-caret-up small rotate180" /></span>
            }
          </a>
        </span>

        <div className="firstLineFragments" />

        {showContactInfo &&
        <div className="" id="contactInfoContent">
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
            <small id="contact-info-inline-edit" className="edit-info">
              <a href={`../../registrationapp/editSection.page?patientId=${patientId}&sectionId=contactInfo&appId=referenceapplication.registrationapp.registerPatient`}>Edit</a>
            </small>
          </div>
        </div>
        }
      </h1>
    </div>

    <div className="identifiers">
      <em>Patient ID</em>
      <span>{patientIdentifier.identifier}</span>
      <br />
    </div>

    {note.length > 0 &&
    <div className="secondLineFragments">
      <div className="clickToEditObs">
        <div className="firstLine">
          <span className="note-wrapper">
            <span>
              <pre className="preformatted-note">{note[0].value}</pre>
            </span>
          </span>
        </div>
        <div className="details secondLine">
          <span className="created-by">{note[0].auditInfo.creator.display}
          </span>&nbsp;
          <span className="created-date">
            {/* {distanceInWordsToNow(note[0].auditInfo.dateCreated, {
              includeSeconds: true, addSuffix: true,
            })} */}
          </span>
        </div>
      </div>
    </div>
    }
  </div>
);

View.propTypes = {
  note: PropTypes.array,
  patient: PropTypes.shape().isRequired,
  showContactInfo: PropTypes.bool.isRequired,
  toggleDetailsView: PropTypes.func.isRequired,
};

View.defaultProps = {
  note: [],
};

const BreadCrumb = props => (
  <ul id="breadcrumbs">
    <li>
      <a href="../../">
        <i className="icon-home small" />
      </a>
    </li>
    <li>
      <i className="icon-chevron-right link" />
      <a
        href={`../../coreapps/clinicianfacing/patient.page?patientId=${props.patientId}`}
      >
        {props.name}
      </a>
    </li>
    <li>
      <i className="icon-chevron-right link" />
      {props.currentOrderTypeText}
    </li>
  </ul>
);

BreadCrumb.propTypes = {
  currentOrderTypeText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  patientId: PropTypes.number,
};

BreadCrumb.defaultProps = {
  patientId: null,
};


export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactInfo: false,
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = query.get('patient');
    // this.props.fetchPatientRecord(patientUuid);
    // this.props.fetchPatientNote(patientUuid);
  }

  toggleDetailsView = () => {
    this.setState(() => ({
      showContactInfo: !this.state.showContactInfo,
    }));
  }

  render() {
    return (
      <div>
        <BreadCrumb
          name={`${this.props.patient.person.personName.familyName}. ${this.props.patient.person.personName.givenName}`}
          patientId={this.props.patient.patientId}
          currentOrderTypeText={this.props.currentOrderTypeText}
        />
        <View
          patient={this.props.patient}
          toggleDetailsView={this.toggleDetailsView}
          showContactInfo={this.state.showContactInfo}
          note={this.props.note}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patient: state.patientReducer.patient,
  note: state.noteReducer.note,
});

const actionCreators = {
//   fetchPatientRecord,
//   fetchPatientNote,
};

Dashboard.propTypes = {
  currentOrderTypeText: PropTypes.string.isRequired,
//   fetchPatientNote: PropTypes.func.isRequired,
//   fetchPatientRecord: PropTypes.func.isRequired,
  location: PropTypes.shape().isRequired,
  note: PropTypes.array,
  patient: PropTypes.shape().isRequired,
};

Dashboard.defaultProps = {
  note: [],
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
