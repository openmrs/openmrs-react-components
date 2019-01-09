import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientSearchActions } from '../../features/search';
import { patientActions } from "../../features/patient/index";
import { DEFAULT_PATIENT_REP} from "../../domain/patient/constants";
import patientUtil from '../../domain/patient/patientUtil';
import PatientSearchForm from './PatientSearchForm';
import DataGrid from "../grid/DataGrid";
import Loader from '../widgets/Loader';
import PatientCard from '../patient/PatientCard';


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

  handleSubmit(value) {
    this.props.dispatch(patientSearchActions.patientSearch(
      value,
      this.props.parseResults, // the can override with a callback function to parse the results returned by the REST API
      this.props.representation));
  };

  handleRowClick(patient) {
    const { dispatch } = this.props;
    dispatch(patientActions.updatePatientInStore(patient));
    dispatch(patientActions.setSelectedPatient(patient));
    dispatch(this.props.rowSelectedActionCreators(patient));
  }

  render() {
    const { rowData, loading, rowSelectedActionCreators } = this.props;
    return (
      <div>
        {this.props.AdditionalFilters &&
          (
            <this.props.AdditionalFilters
              handleSearchChange={this.handleSubmit}
              rowData={rowData}
              searchType="server"
           />
          )
        }
        <PatientSearchForm onSubmit={this.handleSubmit} />
        {loading ? <Loader /> : 
          (rowData.length > 0 ? rowData.map((patientData, index) => 
            (
              PatientCard(
              patientData,
              index,
              (patient) => this.handleRowClick(patient),
              patientUtil.getPreferredIdentifier
              )
            )
          ) : <h2 className="text-center">No Data to display</h2>)
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
  loading: false,
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
