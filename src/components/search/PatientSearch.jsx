import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientSearchActions } from '../../features/patientSearch';
import PatientSearchForm from './PatientSearchForm';
import DataGrid from "../grid/DataGrid";

class PatientSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentWillMount(){
    if (this.props.searchQuery !== undefined && this.props.searchQuery.length > 0) {
      this.handleSubmit({query: this.props.searchQuery});
    }
  }

  handleSubmit(values) {
    this.props.dispatch(patientSearchActions.patientSearch(
      values.query,
      this.props.parseResults, // the client could provide a callback function to parse the results returned by the REST API
      this.props.representation));
  };

  render() {
    return (
      <div>
        <PatientSearchForm onSubmit={this.handleSubmit} />
        <DataGrid
          columnDefs={this.props.columnDefs}
          rowData={this.props.rowData}
          rowSelectedActionCreators={this.props.rowSelectedActionCreators}
        />
      </div>
    );
  };
}

PatientSearch.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  parseResults: PropTypes.func,
  representation: PropTypes.string.isRequired,
  rowData: PropTypes.array,
  rowSelectedActionCreators: PropTypes.array
};

PatientSearch.defaultProps = {
  representation: "custom:(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))"
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.openmrs.patientSearch.results
  };
};

export default connect(mapStateToProps)(PatientSearch);
