import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import programRest from '../../rest/programRest';
import { selectors } from "../../store";
import { formatDate } from "../../util/dateUtil";
import '../../../assets/css/widgets.css';
import * as R from "ramda";


class ProgramEnrollment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      programs: []
    };
  }

  componentDidMount() {
    this.updatePrograms();
  }

  componentDidUpdate(prevProps) {
    if ((R.path(['patient','uuid'], prevProps) !== R.path(['patient','uuid'], this.props)) ||
      (prevProps.isPatientStoreUpdating  && !this.props.isPatientStoreUpdating)) {
      this.updatePrograms();
    }
  }

  updatePrograms() {
    programRest.getProgramEnrollmentByPatient(
      this.props.patient.uuid
    ).then(data => {
      this.setState({
        programs: data.results.sort(function (a, b) {
          return +new Date(b.dateEnrolled) - +new Date(a.dateEnrolled);
        })
      });
    });
  }

  renderProgramsList() {
    return this.state.programs.map((program) => {
      const display = program.program.display.replace(/ program/i, '');
      return (
        <ul
          key={program.program.uuid}
          style={{ paddingInlineStart: '20px' }}
        >
          <span>
            <b>{display} </b>
            since
            <em> {formatDate(program.dateEnrolled)}</em>
          </span>
        </ul>
      );
    });
  }

  renderPatientProgramEnrollMent() {
    return (
      <span>
        <h4><u>Programs</u></h4>
        <span>
          <li>{this.renderProgramsList()}</li>
        </span>
      </span>
    );
  }


  render() {
    const { programs } = this.state;
    const hasPrograms = !R.isEmpty(programs);
    return (
      <div>
        {hasPrograms && this.renderPatientProgramEnrollMent()}
      </div>
    );
  }
}

ProgramEnrollment.propTypes = {
  patient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};


export default connect(mapStateToProps)(ProgramEnrollment);
