import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import encounterRest from '../../rest/encounterRest';
import { selectors } from "../../store";
import { formatDate } from "../../util/dateUtil";
import validations from '../../features/form/validations';
import '../../../assets/css/widgets.css';

class EncounterHistory extends React.Component {

  constructor(props) {
    super(props);

    // TODO figure out how to extract this somehwere
    this.cellPadding = {
      padding: "2px"
    };

    this.state = {
      encounters: []
    };
  }

  componentDidMount() {
    encounterRest.fetchEncountersByPatient(
      this.props.patient.uuid, this.props.encounterType.uuid
    ).then(data => {
      this.setState({
        encounters: data.results.sort(function (a, b) {
          return +new Date(b.encounterDatetime) - +new Date(a.encounterDatetime);
        })
      });
    });
  }

  getLabel(obs) {
    if (!this.props.labels || !this.props.labels[obs.concept.uuid]) {
      return obs.concept.display;
    }
    else {
      return this.props.labels[obs.concept.uuid];
    }
  }

  render() {

    let history = this.state.encounters.map((encounter, i) => {
      return (
        <div key={encounter.id}>
          <h5><u>{ formatDate(encounter.encounterDatetime) }</u></h5>
          <table>
            <tbody>
              {encounter.obs.map((observation) => {
                const {
                  hiNormal,
                  lowNormal,
                  hiCritical,
                  lowCritical,
                } = observation.concept;
                const obsValue = observation.value.display ? observation.value.display : observation.value;
                const validation = {
                  abnormal: validations.abnormalMinValue(lowNormal)(obsValue)
                  || validations.abnormalMaxValue(hiNormal)(obsValue),
                  critical: validations.criticalMaxValue(hiCritical)(obsValue)
                  || validations.criticalMinValue(lowCritical)(obsValue),
                };
                const validationValue = validation.critical ? 'critical' : (validation.abnormal ? 'abnormal' : '');
                return (
                  <tr key={observation.id}>
                    <td style={this.cellPadding}><b>{ this.getLabel(observation) }:</b></td>
                    <td style={this.cellPadding}>{ obsValue }</td>
                    <td style={this.cellPadding}><b>{ observation.concept.units ? observation.concept.units : ''}</b></td>
                    {<td
                      className={validationValue}
                      style={{ visibility: (validation.critical || validation.abnormal) ? 'visible' : 'hidden' }}
                    >
                      ({ validationValue })
                    </td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });

    return (
      <div>
        <span>{ history }</span>
      </div>
    );
  }
}

EncounterHistory.propTypes = {
  encounterType: PropTypes.object.isRequired,
  labels: PropTypes.object,
  patient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};


export default connect(mapStateToProps)(EncounterHistory);
