import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { chain } from 'underscore';
import encounterRest from '../../rest/encounterRest';
import * as R from "ramda";
import { selectors } from "../../store";
import { formatDatetime, formatDate, hasTimeComponent } from "../../util/dateUtil";
import ObsValue from '../obs/ObsValue';
import obsUtil from '../../features/obs/util';
import '../../../assets/css/widgets.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


// TODO should this be changed to use redux? should we extract the REST calls into actions/reducers/etc
// TODO add limit or date range restrictions?
// TODO group by obs group?
// TODO allow specifying concepts in order to control display order?
class EncounterHistory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      encounters: []
    };
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


  updateEncounters() {
    encounterRest.fetchEncountersByPatient(
      this.props.patient.uuid, this.props.encounterType.uuid
    ).then(data => {
      var encounters = data.results.sort(function (a, b) {
        return +new Date(b.encounterDatetime) - +new Date(a.encounterDatetime);
      });
      if (this.props.maxEncounters) {
        encounters = encounters.slice(0, this.props.maxEncounters);
      }
      this.setState({
        encounters: encounters
      });
    });
  }

  onEditClick(encounterUuid) {
    if (this.props.onEditActionCreators) {
      this.props.onEditActionCreators.forEach((f) => this.props.dispatch(f(encounterUuid)));
    }

    // generally should be using action creators, but this provides a way to also accept "old school" callbacks
    if (this.props.onEditCallbacks) {
      this.props.onEditCallbacks.forEach( (f) => f(encounterUuid));
    }
  }

  formatEncounterDate(encounter) {
    return hasTimeComponent(encounter.encounterDatetime) ?
      formatDatetime(encounter.encounterDatetime)
      : formatDate(encounter.encounterDatetime);
  }

  render() {

    const history = this.state.encounters.map((encounter, i) => {
      return (
        <div key={encounter.uuid}>
          <h5>
            { this.props.editable ?
              (<a onClick={() => this.onEditClick(encounter.uuid)}>
                <u>
                  {
                    this.formatEncounterDate(encounter)
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
                  this.formatEncounterDate(encounter)
                }
              </u>)
            }
          </h5>
          <table>
            <tbody>
              {chain(obsUtil.flattenObs(encounter.obs, true))
                .sortBy((obs) => this.props.concepts ? this.props.concepts.findIndex(concept => concept.uuid === obs.concept.uuid) : null)  // sort based on order of concepts in props list; this may be inefficient to do before grouping?
                .value()
                .map((obs) =>
                {
                  // to support overriding the absolute, abnormal, and critical ranges defined on the concept
                  const concept = this.props.concepts && this.props.concepts.find(concept => concept.uuid === obs.concept.uuid);

                  return (
                    <ObsValue
                      concept={concept}
                      key={obs.uuid}
                      labels={this.props.labels}
                      obs={obs}
                    />
                  );
                })
              }
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
  concepts: PropTypes.array,
  editable: PropTypes.bool.isRequired,
  encounterType: PropTypes.object.isRequired,
  maxEncounters: PropTypes.number,
  onEditActionCreators: PropTypes.array,
  onEditCallbacks: PropTypes.array,
  labels: PropTypes.object,
  patient: PropTypes.object.isRequired
};

EncounterHistory.defaultProps = {
  editable: false,
  onEditActionCreators: [],
  onEditCallbacks: []
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatient(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};


export default connect(mapStateToProps)(EncounterHistory);
