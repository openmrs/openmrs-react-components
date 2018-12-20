import React from 'react';
import PropTypes from 'prop-types';
import validations from "../../features/form/validations";


const ObsValue = (props) => {

  // TODO figure out how to extract this somewhere
  const cellPadding = {
    padding: "2px"
  };

  const getObsLabel = (obs) => {
    if (!props.labels || !props.labels[obs.concept.uuid]) {
      return obs.concept.display;
    }
    else {
      return props.labels[obs.concept.uuid];
    }
  };

  const getObsValue = (obs) => {

    if (obs.value) {
      if (!props.labels || !obs.value.uuid || !props.labels[obs.value.uuid]) {
        return obs.value.display ? obs.value.display : obs.value;
      }
      else {
        return props.labels[obs.value.uuid];
      }
    }

    return null;
  };

  const {
    hiNormal,
    lowNormal,
    hiCritical,
    lowCritical,
  } = props.obs.concept;

  const obsValue = getObsValue(props.obs);

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
      <td style={cellPadding}><b>{ getObsLabel(props.obs) }:</b></td>
      <td style={cellPadding}>{ obsValue }</td>
      <td style={cellPadding}><b>{ props.obs.concept.units ? props.obs.concept.units : ''}</b></td>
      {<td
        className={validationValue}
        style={{ visibility: (validation.critical || validation.abnormal) ? 'visible' : 'hidden' }}
      >
        ({ validationValue })
      </td>}
    </tr>
  );

};

ObsValue.propTypes = {
  labels: PropTypes.object,
  obs: PropTypes.object.isRequired
};

export default ObsValue;
