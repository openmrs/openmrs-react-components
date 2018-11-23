import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import encounterRest from '../../rest/encounterRest';
import { selectors } from "../../store";
import { formatDate } from "../../util/dateUtil";

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
                return (
                  <tr key={observation.id}>
                    <td style={this.cellPadding}><b>{ this.getLabel(observation) }:</b></td>
                    <td style={this.cellPadding}>{ observation.value.display ? observation.value.display : observation.value }</td>
                    <td style={this.cellPadding}><b>{ observation.concept.units ? observation.concept.units : ''}</b></td>
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
        { history }
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
