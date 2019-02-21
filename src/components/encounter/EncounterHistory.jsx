import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import encounterRest from '../../rest/encounterRest';
import * as R from "ramda";
import { selectors } from "../../store";
import { formatDate } from "../../util/dateUtil";
import ObsValue from '../obs/ObsValue';
import '../../../assets/css/widgets.css';


// TODO should this be changed to use redux? should we extract the REST calls into actions/reducers/etc
// TODO add limit or date range restrictions?
class EncounterHistory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      encounters: []
    };
  }

  updateEncounters() {
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

  componentDidMount() {
    this.updateEncounters();
  }

  componentDidUpdate(prevProps) {
    // update if the selected patient has changed, or the patient store had been refreshed
    // TODO: test if the 'selected patient changed' trigger works properly
    if ((R.path(['patient','uuid'], prevProps) !== R.path(['patient','uuid'], this.props)) ||
      (prevProps.isPatientStoreUpdating  && !this.props.isPatientStoreUpdating)) {
      this.updateEncounters();
    }
  }

  render() {

    const history = this.state.encounters.map((encounter, i) => {
      return (
        <div key={encounter.uuid}>
          <h5><u>{ formatDate(encounter.encounterDatetime) }</u></h5>
          <table>
            <tbody>
              {encounter.obs.map((o) =>
                <ObsValue
                  key={o.uuid}
                  labels={this.props.labels}
                  obs={o}
                />)}
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
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};


export default connect(mapStateToProps)(EncounterHistory);
