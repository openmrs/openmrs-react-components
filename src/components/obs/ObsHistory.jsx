import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from "ramda";
import { chain } from 'underscore';
import { startOfDay, parse  } from 'date-fns';
import ObsValue from '../obs/ObsValue';
import obsRest from '../../rest/obsRest';
import { selectors } from "../../store";
import { formatDate } from "../../util/dateUtil";

// TODO document better!

// this component gets the obs to display by one of two means:
// 1) if there is an "obs" prop, use the obs in the prop
// 2) otherwise, make a REST call to fetch the obs based on concept prop

// TODO perhaps support Encounter or Visit here?
// TODO perhaps decouple the display from the REST call that fetches the obs?

class ObsHistory extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: []
    };
  }

  componentDidMount() {
    this.updateObs();
  }

  componentDidUpdate(prevProps) {

    // TODO do we need a deep compare here?
    if (this.props.obs && this.props.obs !== prevProps.obs) {
      this.updateObs();
    }
    // update if the selected patient has changed, or the patient store had been refreshed
    // TODO: test if the 'selected patient changed' trigger works properly
    else if (R.path(['patient','uuid'], prevProps) !== R.path(['patient','uuid'], this.props) ||
      (prevProps.isPatientStoreUpdating  && !this.props.isPatientStoreUpdating)) {
      this.updateObs();
    }
  }

  updateObs() {

    if (this.props.obs) {
      this.setState({
        obs: this.sortAndGroupResults(this.props.obs)
      });
    }
    else {
      obsRest.fetchObsByPatient(
        this.props.patient.uuid,
        this.props.concepts ? this.props.concepts.map((concept) => concept.uuid) : null,
        this.props.answers ? this.props.answers.map((answer) => answer.uuid) : null,
        this.props.groupingConcepts ? this.props.groupingConcepts.map((groupingConcept) => groupingConcept.uuid) : null
      ).then(data => {
        this.setState({
          obs: this.sortAndGroupResults(data.results)
        });
      });
    }

  }

  getDateFromObs(obs) {
    // prefer encounterDatetime if present
    return obs.encounter ? obs.encounter.encounterDatetime : obs.obsDatetime;
  }

  // TODO all this [0][0] and [0][0][0] stuff smells, is there a better way? use actual maps instead of arrays, etc?
  // TODO we only want to import the methods we use to save space (ie does chaining import everything?)
  sortAndGroupResults(results) {
    const set = chain(results)
    // TODO if this.props.concepts, then filter by this, so we can control which obs to display?
      .sortBy((obs) => this.props.concepts.findIndex(concept => concept.uuid === obs.concept.uuid))  // sort based on order of concepts in props list; this may be inefficient to do before grouping?
      .groupBy((obs) => obs.obsGroup ? obs.obsGroup.uuid : obs.uuid)   // group by obs group, if present
      .values()
      .groupBy((obsByGroup) => obsByGroup[0].encounter ? obsByGroup[0].encounter.uuid : obsByGroup[0].uuid)  //group by encounter, if present
      .values()
      .groupBy((obsByEncounterAndGroup) => startOfDay(this.getDateFromObs(obsByEncounterAndGroup[0][0])))  // group by encounter date or obs date
      .values()
      // TODO can we do better than just sort by day?
      .sortBy((obsByDateAndEncounterAndGroup) => -parse(this.getDateFromObs(obsByDateAndEncounterAndGroup[0][0][0])))
      .value();
    return set;
  }

  render() {
    return (
      <div>
        {this.state.obs.map((obsByDateAndEncounterAndGroup) => {
          return (
            <div key={obsByDateAndEncounterAndGroup[0][0][0].uuid}>
              {this.props.showDates && (<h5>
                <u>
                  {formatDate(this.getDateFromObs(obsByDateAndEncounterAndGroup[0][0][0]))}
                </u>
              </h5>)}
              <table>
                {obsByDateAndEncounterAndGroup.map((obsByEncounterAndGroup)=> {
                  return (
                    <tbody key={obsByEncounterAndGroup[0][0].uuid}>
                      {obsByEncounterAndGroup.map((obsByGroup) =>
                        obsByGroup.map((obs) => {

                          // to support user to override the absolute, abnormal, and critical ranges defined on the concept
                          const concept = this.props.concepts.find(concept => concept.uuid === obs.concept.uuid) || obs.concept;

                          return (
                            <ObsValue
                              concept={concept}
                              key={obs.uuid}
                              labels={this.props.labels}
                              obs={obs}
                              reverseLabelAndValue={this.props.reverseLabelAndValue}
                            />
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

ObsHistory.defaultProps = {
  reverseLabelAndValue: false,    // for displaying obs where the question is really answer
  showDates: true
};

ObsHistory.propTypes = {
  answers: PropTypes.array,
  concepts: PropTypes.array,
  groupingConcepts: PropTypes.array,
  labels: PropTypes.object,
  obs: PropTypes.array,
  patient: PropTypes.object.isRequired,
  reverseLabelAndValue: PropTypes.bool.isRequired,
  showDates: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(ObsHistory);
