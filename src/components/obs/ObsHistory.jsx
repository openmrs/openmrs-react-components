import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from "ramda";
import ObsValue from '../obs/ObsValue';
import obsRest from '../../rest/obsRest';
import { selectors } from "../../store";

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
        obs: data.results
      });
    });
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
        <table>
          <tbody>
            {this.state.obs.map((o) =>
              <ObsValue
                key={o.id}
                labels={this.props.labels}
                obs={o}
              />)}
          </tbody>
        </table>
      </div>
    );
  }
}

ObsHistory.propTypes = {
  concepts: PropTypes.object,
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
