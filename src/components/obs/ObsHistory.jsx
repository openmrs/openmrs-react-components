import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from "ramda";
import { chain } from 'underscore';
import { startOfDay, parse  } from 'date-fns';
import ObsValue from '../obs/ObsValue';
import obsRest from '../../rest/obsRest';
import { selectors } from "../../store";
import { formatDatetime, formatDate, hasTimeComponent } from "../../util/dateUtil";
import Loader from "../widgets/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// TODO document better!

// this component gets the obs to display by one of two means:
// 1) if there is an "obs" prop, use the obs in the prop
// 2) otherwise, make a REST call to fetch the obs based on concept prop
// obs are grouped by date, encounter, and obs group; if showDates=true then for each encounter the encounter date is shown

// TODO perhaps decouple the display from the REST call that fetches the obs?

class ObsHistory extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: [],
      loading: true
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
        obs: this.sortAndGroupResults(this.props.obs),
        loading: this.props.loading   // if the consumer passes in it's own obs, can pass in a "loading" as well
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
          obs: this.sortAndGroupResults(data.results),
          loading: false
        });
      });
    }

  }

  isEditableEncounter(encounter) {
    return encounter && encounter.encounterType && this.props.editableEncounterTypes.map(e => e.uuid).includes(encounter.encounterType.uuid);
  }

  onEditEncounterClick(encounterUuid) {
    if (this.props.onEditEncounterActionCreators) {
      this.props.onEditEncounterActionCreators.forEach((f) => this.props.dispatch(f(encounterUuid)));
    }

    // generally should be using action creators, but this provides a way to also accept "old school" callbacks
    if (this.props.onEditEncounterCallbacks) {
      this.props.onEditEncounterCallbacks.forEach( (f) => f(encounterUuid));
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
      .sortBy((obs) => this.props.concepts ? this.props.concepts.findIndex(concept => concept.uuid === obs.concept.uuid) : null)  // sort based on order of concepts in props list; this may be inefficient to do before grouping?
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

  formatObsDate(obs) {
    return hasTimeComponent(this.getDateFromObs(obs)) ?
      formatDatetime(this.getDateFromObs(obs))
      : formatDate(this.getDateFromObs(obs));
  }

  render() {

    if (!this.state.loading) {
      return (
        <div>
          {this.state.obs.map((obsByDateAndEncounterAndGroup) =>
            obsByDateAndEncounterAndGroup.map((obsByEncounterAndGroup) => {

              return (
                <div key={obsByEncounterAndGroup[0][0].uuid}>
                  {this.props.showDates && (
                    <h5>
                      { this.isEditableEncounter(obsByEncounterAndGroup[0][0].encounter) ?
                        (<a onClick={() => this.onEditEncounterClick(obsByEncounterAndGroup[0][0].encounter.uuid)}>
                          <u>
                            {
                              this.formatObsDate(obsByEncounterAndGroup[0][0])
                            }
                          </u>
                          &nbsp;
                          <FontAwesomeIcon
                            icon="pencil-alt"
                          />
                        </a>)
                        :
                        (<u>
                          {
                            this.formatObsDate(obsByEncounterAndGroup[0][0])
                          }
                        </u>)
                      }
                    </h5>)}
                  <table>
                    <tbody>
                      {obsByEncounterAndGroup.map((obsByGroup) =>
                        obsByGroup.map((obs) => {

                          // to support overriding the absolute, abnormal, and critical ranges defined on the concept
                          const concept = this.props.concepts && this.props.concepts.find(concept => concept.uuid === obs.concept.uuid);

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
                  </table>
                </div>
              );

            })
          )}
        </div>
      );
    }
    return (
      <div>
        <Loader />
      </div>
    );
  }
}

ObsHistory.propTypes = {
  answers: PropTypes.array,
  concepts: PropTypes.array,
  editableEncounterTypes: PropTypes.array,
  groupingConcepts: PropTypes.array,
  labels: PropTypes.object,
  loading: PropTypes.bool,
  obs: PropTypes.array,
  onEditEncounterActionCreators: PropTypes.array,
  onEditEncounterCallbacks: PropTypes.array,
  patient: PropTypes.object.isRequired,
  reverseLabelAndValue: PropTypes.bool.isRequired,
  showDates: PropTypes.bool.isRequired
};

ObsHistory.defaultProps = {
  editableEncounterTypes: [],
  reverseLabelAndValue: false,    // for displaying obs where the question is really answer
  showDates: true
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(ObsHistory);
