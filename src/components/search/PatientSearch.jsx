import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientSearchActions } from '../../features/search';
import { patientActions } from "../../features/patient/index";
import { DEFAULT_PATIENT_REP} from "../../domain/patient/constants";
import patientUtil from '../../domain/patient/patientUtil';
import PatientSearchForm from './PatientSearchForm';
import DataGrid from "../grid/DataGrid";

// TODO: do we want a way override the default actions to clear the selected patient and add the patient to the store?

class PatientSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentWillMount(){
    this.props.dispatch(patientSearchActions.clearPatientSearch());
    this.props.dispatch(patientActions.clearSelectedPatient());
    if (this.props.searchQuery !== undefined && this.props.searchQuery.length > 0) {
      this.handleSubmit({query: this.props.searchQuery});
    }
  }

  handleSubmit(values) {
    this.props.dispatch(patientSearchActions.patientSearch(
      values.query,
      this.props.parseResults, // the can override with a callback function to parse the results returned by the REST API
      this.props.representation));
  };

  render() {
    return (
      <div>
        <PatientSearchForm onSubmit={this.handleSubmit} />
        { (typeof this.props.rowData !== 'undefined') && (this.props.rowData.length > 0) &&
          <DataGrid
            columnDefs={this.props.columnDefs}
            rowData={this.props.rowData}
            rowSelectedActionCreators={
              [patientActions.addPatientToStore,
                patientActions.setSelectedPatient,
                ...this.props.rowSelectedActionCreators]}
          />
        }
      </div>
    );
  };
}

PatientSearch.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  parseResults: PropTypes.func.isRequired,
  representation: PropTypes.string.isRequired,
  rowData: PropTypes.array,
  rowSelectedActionCreators: PropTypes.array.isRequired
};

PatientSearch.defaultProps = {
  columnDefs: [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    { headerName: 'Identifier', valueGetter: (params) => patientUtil.getPreferredIdentifier(params.data) },
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' }
  ],
  parseResults:(results) => {
    // convert results to the patient domain object
    return results.map((result) => {
      return patientUtil.createFromRestRep(result);
    });
  },
  representation: "custom:" + DEFAULT_PATIENT_REP,
  rowSelectedActionCreators: []
};

const mapStateToProps = (state) => {
  return {
    rowData: state.openmrs.patientSearch.results ? state.openmrs.patientSearch.results : []
  };
};

export default connect(mapStateToProps)(PatientSearch);
