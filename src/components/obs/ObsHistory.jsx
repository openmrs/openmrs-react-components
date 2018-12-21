import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from "ramda";
import { chain } from 'underscore';
import { getDayOfYear, parse  } from 'date-fns';
import ObsValue from '../obs/ObsValue';
import obsRest from '../../rest/obsRest';
import { selectors } from "../../store";
import {formatDate} from "../../util/dateUtil";

class ObsHistory extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: []
    };
  }

  updateObs() {
    obsRest.fetchObsByPatient(
      this.props.patient.uuid, this.props.concepts.map((concept) => concept.uuid)
    ).then(data => {
      this.setState({
        obs: this.sortAndGroupResults(data.results)
      });
    });
  }

  // TODO all this [0][0] and [0][0][0] stuff smells, is there a better way to use actual maps instead of arrays, etc?
  // TODO can we better sort by day?
  sortAndGroupResults(results) {


    const set = chain(results)
      .groupBy((obs) => obs.obsGroup ? obs.obsGroup : obs.uuid)   // group by obs group, if present
      .values()
      .groupBy((obsByGroup) => obsByGroup[0].encounter ? obsByGroup[0].encounter.uuid : obsByGroup[0].uuid)  //group by encounter, if present
      .values()
      .groupBy((obsByEncounter) => getDayOfYear(obsByEncounter[0][0].encounter ? obsByEncounter[0][0].encounter.encounterDatetime : obsByEncounter[0][0].obsDatetime))  // group by encounter date or obs date
      .values()
      .sortBy((obsByDate) => -parse(obsByDate[0][0][0].encounter ? obsByDate[0][0][0].encounter.encounterDatetime : obsByDate[0][0][0].obsDatetime))
      .value();

    return set;
  }

  componentDidMount() {
    this.updateObs();
  }

  componentDidUpdate(prevProps) {
    // update if the selected patient has changed, or the patient store had been refreshed
    // TODO: test if the 'selected patient changed' trigger works properly
    if ((R.path(['patient','uuid'], prevProps) !== R.path(['patient','uuid'], this.props)) ||
      (prevProps.isPatientStoreUpdating  && !this.props.isPatientStoreUpdating)) {
      this.updateObs();
    }
  }

  render() {
    return (
      <div>
        {this.state.obs.map((obsByDate) => {
          return (
            <div key={obsByDate[0][0][0].id}>
              <h5>
                <u>
                  {formatDate(obsByDate[0][0][0].encounter ? obsByDate[0][0][0].encounter.encounterDatetime : obsByDate[0][0][0].obsDatetime)}
                </u>
              </h5>
              <table>
                {obsByDate.map((obsByEncounter)=> {
                  return (
                    <tbody key={obsByEncounter[0][0].id}>
                      {obsByEncounter.map((obsByGroup) =>
                        obsByGroup.map((obs) => {
                          return (
                            <ObsValue
                              key={obs.id}
                              labels={this.props.labels}
                              obs={obs} />
                          );
                        })
                      )}
                      <tr>
                        <td colSpan={4} />
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          );
        })}
      </div>
    );
  }
}

ObsHistory.propTypes = {
  concepts: PropTypes.array,
  labels: PropTypes.object,
  patient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(ObsHistory);
