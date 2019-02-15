import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Glyphicon } from 'react-bootstrap';
import { withRouter } from "react-router";
import { selectors } from '../../store';
import { DATE_FORMAT } from "../../constants";
import patientUtil from '../../domain/patient/patientUtil';
import '../../../assets/css/patientHeader.css';

export class PatientHeader extends PureComponent {
  constructor(props) {
    super(props);
    // converts from REST rep but *only if necessary*; handles already-converted Patient object as well
    this.state = {
      patient: patientUtil.createFromRestRep(this.props.patient),
      patientIdentifiers: [],
      additionalPatientIdentifiers: [],
      shouldDisplayAdditionalPatientIdentifier: false
    };

    this.togglePatientIdentifierDisplay = this.togglePatientIdentifierDisplay.bind(this);
  };

  componentDidMount() {
    if (this.state.patient) {
      const { identifiersToDisplay, identifierTypesToDisplay, locations, sessionLocation } = this.props;
      const { patient } = this.state;
      let identifiers = [], additionalIdentifiers = [];
      if (identifierTypesToDisplay) {
        identifiers = this.props.identifierTypesToDisplay.reduce((acc, identifierType) =>
          [...acc, ...patientUtil.getIdentifiers(this.state.patient, identifierType)]
          , []);
      } else if (identifiersToDisplay) {
        const getIdentifiersToDisplay = identifiersToDisplay(patient, locations, sessionLocation);
        identifiers = getIdentifiersToDisplay.identifiers;
        additionalIdentifiers = getIdentifiersToDisplay.additionalIdentifiers;
      } else {
        identifiers = patientUtil.getIdentifiers(this.state.patient);
      }
    
      this.setState({ patientIdentifiers: identifiers });
      this.setState({ additionalPatientIdentifiers: additionalIdentifiers });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.state;
    if (nextProps.patient.uuid !== patient.uuid) {
      this.setState({
        patient: patientUtil.createFromRestRep(this.props.patient),
      });
    }
  }

  togglePatientIdentifierDisplay() {
    this.setState({ shouldDisplayAdditionalPatientIdentifier: !this.state.shouldDisplayAdditionalPatientIdentifier });
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
              {this.state.patient.age} year(s) { this.state.patient.birthdate ? ('(' + dateFns.format(this.state.patient.birthdate, DATE_FORMAT) + ')') : ''}
            </span>
          </span>
        </h2>
      </div>
    );
  }

  renderPatientIdentifier() {
    const { shouldDisplayAdditionalPatientIdentifier, additionalPatientIdentifiers, patientIdentifiers } = this.state;
    const { identifiersToDisplay } = this.props;
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        <div className="identifiers-number">
          { patientIdentifiers.map(identifier => <span key={identifier}>{identifier}</span>)}
          { shouldDisplayAdditionalPatientIdentifier && additionalPatientIdentifiers.map(identifier => <span key={identifier}>{identifier}</span>)}
          { additionalPatientIdentifiers.length > 0 && <a
            className="identifier-toggle-anchor" 
            onClick={this.togglePatientIdentifierDisplay}
          >
            Show {shouldDisplayAdditionalPatientIdentifier ? 'less' : 'more'}&nbsp;
            <Glyphicon
              className="back-button-icon"
              glyph={shouldDisplayAdditionalPatientIdentifier ? 'triangle-top' : 'triangle-bottom'}
            />
          </a>}
        </div>
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
  identifiersToDisplay: PropTypes.func,
  patient: PropTypes.shape({}),
  showBackButton: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    sessionLocation: selectors.getSessionLocation(state),
    identifierTypes: state.openmrs.metadata.patientIdentifierTypes,
    locations: state.openmrs.metadata.locations,
  };
};

export default withRouter(connect(mapStateToProps)(PatientHeader));
