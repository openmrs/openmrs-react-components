import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import validations from "../../features/form/validations";
import { selectors } from "../../store";
import { conceptActions } from "../../features/concept";

class ObsValue extends React.PureComponent{


  componentDidMount() {
    // we need to test on "props.concept._openmrsClass" instead of just "props.concept" because we allow user to pass their own concept prop to supply custom validation values
    if (!this.props.concept._openmrsClass) {
      this.props.dispatch(conceptActions.fetchConcepts([this.props.obs.concept.uuid]));
    }
  }

  getObsLabel(obs) {
    if (!this.props.labels || !this.props.labels[obs.concept.uuid]) {
      return this.props.concept ? this.props.concept.display : null;
    }
    else {
      return this.props.labels[obs.concept.uuid];
    }
  };

  getObsValue(obs) {
    if (obs.value) {
      if (!this.props.labels || !obs.value.uuid || !this.props.labels[obs.value.uuid]) {
        return obs.value.display ? obs.value.display : obs.value;
      }
      else {
        return this.props.labels[obs.value.uuid];
      }
    }
    return null;
  };

  render() {

    const cellPadding = {
      padding: "2px"
    };

    const {
      hiNormal,
      lowNormal,
      hiCritical,
      lowCritical,
    } = this.props.concept || {};

    const obsValue = this.getObsValue(this.props.obs);

    let validation = {
      abnormal: undefined,
      critical: undefined,
    };

    if (hiNormal || lowNormal) {
      validation.abnormal = validations.abnormalMinValue(lowNormal)(obsValue) || validations.abnormalMaxValue(hiNormal)(obsValue);
    }

    if (hiCritical || lowCritical) {
      validation.critical = validations.criticalMaxValue(hiCritical)(obsValue) || validations.criticalMinValue(lowCritical)(obsValue);
    }

    const validationValue = validation.critical ? 'critical' : (validation.abnormal ? 'abnormal' : '');

    // TODO provide a way to support other formats than a table?
    return (
      <tr>
        <td style={cellPadding}><b>{ this.getObsLabel(this.props.obs) }:</b></td>
        <td style={cellPadding}>{ obsValue } { this.props.concept && this.props.concept.units ? this.props.concept.units : ''}</td>
        {
          <td
            className={validationValue}
            style={{ visibility: (validation.critical || validation.abnormal) ? 'visible' : 'hidden' }}
          >
          ({ validationValue })
          </td>
        }
      </tr>
    );

  }

}

ObsValue.propTypes = {
  concept: PropTypes.object,
  labels: PropTypes.object,
  obs: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const concept = selectors.getConcept(state, ownProps.obs.concept.uuid);
  return {
    concept: { ...concept, ...ownProps.concept }   // this allows user to override the absolute, abnormal, and critical ranges defined on the concept
  };
};

export default connect(mapStateToProps)(ObsValue);
