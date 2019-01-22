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
      const { identifiersToDisplay, identifierTypesToDisplay, currentLocationPrefix } = this.props;
      let identifiers = [], additionalIdentifiers = [];
      if (identifierTypesToDisplay) {
        identifiers = this.props.identifierTypesToDisplay.reduce((acc, identifierType) =>
          [...acc, ...patientUtil.getIdentifiers(this.state.patient, identifierType)]
          , []);
      } else if (identifiersToDisplay) {
        const baseIdentifiers = patientUtil.getIdentifiers(this.state.patient);
        const hasCCCIdentifier = patientUtil.getIdentifiersAndPreferred(this.state.patient, this.props.cccNumber);
        const hasHCCIdentifier = patientUtil.getIdentifiersAndPreferred(this.state.patient, this.props.hccNumber);

        // Check if it had CCC identifier, if only 1 use as default
        if (hasCCCIdentifier.length === 1) {
          identifiers.push(hasCCCIdentifier[0].identifier);
        } else if (hasCCCIdentifier.length > 1) {
        // If more than 1 CCC identifier, use current location identifier
          const getCccCurrentLocation = hasCCCIdentifier.find(identifier => identifier.identifier.match(currentLocationPrefix));
          if (getCccCurrentLocation && currentLocationPrefix) {
            identifiers.push(getCccCurrentLocation[0].identifier);
          } else {
          // If more than 1 CCC identifier and no currentLocation use preferred
            const getCccPreferred = hasCCCIdentifier.find(identifier => identifier.preferred === true);
            if (getCccPreferred) {
              identifiers.push(getCccPreferred[0].identifier);
            } else {
            // if NO preferred CCC identifier, use first one
              identifiers.push(hasCCCIdentifier[0].identifier);
            }
          }
        }

        if (hasHCCIdentifier.length === 1) {
          identifiers.push(hasHCCIdentifier[0].identifier);
        } else if (hasHCCIdentifier.length > 1) {
          const getHccCurrentLocation = hasCCCIdentifier.find(identifier => identifier.identifier.match(currentLocationPrefix));
          if (getHccCurrentLocation && currentLocationPrefix) {
            identifiers.push(getHccCurrentLocation[0].identifier);
          } else {
            const getHccPreferred = hasHCCIdentifier.find(identifier => identifier.preferred === true);
            if (getHccPreferred) {
              identifiers.push(getHccPreferred[0].identifier);
            } else {
              identifiers.push(hasHCCIdentifier[0].identifier);
            }
          }
        }
      
        const patientIdentifiersLength = identifiers.length;
        let uniqueIdentifiers = [...new Set(identifiers.concat(baseIdentifiers))];
        uniqueIdentifiers.splice(0, patientIdentifiersLength);

        if (identifiers.length === 0) {
          identifiers.push(uniqueIdentifiers[0]);
          uniqueIdentifiers.splice(0, 1);
        }
        additionalIdentifiers = uniqueIdentifiers;

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
              {this.state.patient.age} year(s) { this.state.patient.birthdate ? ('(' + dateFns.format(new Date(this.state.patient.birthdate), DATE_FORMAT) + ')') : ''}
            </span>
          </span>
        </h2>
      </div>
    );
  }

  // TODO allow limit by preferred?
  renderPatientIdentifier() {
    const { shouldDisplayAdditionalPatientIdentifier, additionalPatientIdentifiers, patientIdentifiers } = this.state;
    return (
      <div className="identifiers">
        <em>Patient ID</em>
        <div className="identifiers-number">
          { patientIdentifiers.map(identifier => <span key={identifier}>{identifier}</span>)}
          { shouldDisplayAdditionalPatientIdentifier && additionalPatientIdentifiers.map(identifier => <span key={identifier}>{identifier}</span>)}
          <a
            className="identifier-toggle-anchor" 
            onClick={this.togglePatientIdentifierDisplay}
          >
            Show {shouldDisplayAdditionalPatientIdentifier ? 'less' : 'more'}&nbsp;
            <Glyphicon
              className="back-button-icon"
              glyph={shouldDisplayAdditionalPatientIdentifier ? 'triangle-top' : 'triangle-bottom'}
            />
          </a>
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
  identifierToDisplay: PropTypes.func,
  identifierTypesToDisplay: PropTypes.array,
  patient: PropTypes.shape({}),
  showBackButton: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    cccNumber: selectors.getPatientIdentifierTypeByName(state, 'Chronic Care Number'),
    hccNumber: selectors.getPatientIdentifierTypeByName(state, 'HCC Number'),
    sessionLocation: state.openmrs.session.sessionLocation,
    identifierTypes: state.openmrs.metadata.patientIdentifierTypes,
    currentLocationPrefix: state.openmrs.session.currentLocationPrefix
  };
};

export default withRouter(connect(mapStateToProps)(PatientHeader));
