import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Glyphicon } from 'react-bootstrap';
import { withRouter } from "react-router";
import { selectors } from '../../store';
import { DATE_FORMAT } from "../../constants";
import patientUtil from '../../domain/patient/patientUtil';
import { formatAge } from '../../features/patient/utils';
import '../../../assets/css/patientHeader.css';
import { getIntl } from "../localization/withLocalization";

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

    // because we are instantiating this here, we probably need to do a full reload when changing locale?
    this.intl = getIntl(props.locale);

    this.togglePatientIdentifierDisplay = this.togglePatientIdentifierDisplay.bind(this);
    this.handlePatientLink = this.handlePatientLink.bind(this);
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
      const updatedPatient = patientUtil.createFromRestRep(this.props.patient);
      this.setState({
        patient: updatedPatient,
        patientIdentifiers: patientUtil.getIdentifiers(updatedPatient)
      });
    }
  }

  togglePatientIdentifierDisplay() {
    this.setState({ shouldDisplayAdditionalPatientIdentifier: !this.state.shouldDisplayAdditionalPatientIdentifier });
  }

  handlePatientLink() {
    if (this.props.patientLink) {
      this.props.history.push(this.props.patientLink);
    }
  }

  renderDemographics() {
    const { age } = formatAge(this.state.patient.birthdate);
    const maleMsg = this.intl.formatMessage({ id: "reactcomponents.male", defaultMessage: "Male" });
    const femaleMsg = this.intl.formatMessage({ id: "reactcomponents.female", defaultMessage: "Female" });
    return (
      <div className="demographics" onClick={this.handlePatientLink}>
        <h2 className="name">
          <span>
            <span className="PersonName-givenName">{patientUtil.getGivenName(this.state.patient)}&nbsp;&nbsp;</span>
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
            <span className="gender">{this.state.patient.gender === 'M' ? maleMsg : femaleMsg}</span>
            <span className="age">
              {age}
              { this.state.patient.birthdate && ('(' + dateFns.format(this.state.patient.birthdate, DATE_FORMAT) + ')') }
            </span>
          </span>
        </h2>
      </div>
    );
  }

  renderPatientIdentifier() {
    const { shouldDisplayAdditionalPatientIdentifier, additionalPatientIdentifiers, patientIdentifiers } = this.state;;
    const patientId = this.intl.formatMessage({ id: "reactcomponents.patient.id", defaultMessage: "Patient ID" });
    return (
      <div className="identifiers">
        <em onClick={this.handlePatientLink}>{ patientId }</em>
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
    locale: selectors.getSession(state).locale,
    sessionLocation: selectors.getSessionLocation(state),
    identifierTypes: state.openmrs.metadata.patientIdentifierTypes,
    locations: state.openmrs.metadata.locations,
  };
};

export default withRouter(connect(mapStateToProps)(PatientHeader));
