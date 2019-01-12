import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { patientSearchActions } from '../../features/search';
import { patientActions } from "../../features/patient/index";
import { DEFAULT_PATIENT_REP } from "../../domain/patient/constants";
import patientUtil from '../../domain/patient/patientUtil';
import CardList from "../cardList/CardList";
import PatientCard from '../patient/PatientCard';


// TODO: do we want a way override the default actions to clear the selected patient and add the patient to the store?

class PatientSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(value) {
    this.props.dispatch(patientSearchActions.patientSearch(
      value,
      this.props.parseResults, // the can override with a callback function to parse the results returned by the REST API
      this.props.representation));
  };

  render() {
    const onMountOtherActionCreators = this.props.onMountOtherActionCreators ? this.props.onMountOtherActionCreators :
      [
        () => this.props.dispatch(patientSearchActions.clearPatientSearch()),
        () => this.props.dispatch(patientActions.clearSelectedPatient()),
      ];

    return (
      <div>
        <CardList 
          AdditionalSearchFilters={this.props.AdditionalFilters}
          card={PatientCard}
          delayInterval={0}
          dispatch={this.props.dispatch}
          getPatientIdentifiers={this.props.getPatientIdentifiers}
          handleSearchChange={this.handleSubmit}
          handleSearchSubmit={this.handleSubmit}
          loading={this.props.isUpdating}
          noDataMessage="No patients to display"
          onMountOtherActionCreators={onMountOtherActionCreators}
          rowData={this.props.rowData}
          rowSelectedActionCreators={[patientActions.setSelectedPatient, patientActions.updatePatientInStore, ...this.props.rowSelectedActionCreators]}
          searchFilterFields={null}
          searchType="server"
          title={this.props.title}
        />
      </div>
    );
  };
}

PatientSearch.propTypes = {
  AdditionalFilters: PropTypes.func,
  getPatientIdentifiers: PropTypes.func,
  isUpdating: PropTypes.bool,
  parseResults: PropTypes.func.isRequired,
  representation: PropTypes.string.isRequired,
  rowData: PropTypes.array,
  rowSelectedActionCreators: PropTypes.array.isRequired,
  title: PropTypes.string,
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
    rowData: state.openmrs.patientSearch.results ? state.openmrs.patientSearch.results : [],
    isUpdating: state.openmrs.patientSearch.isUpdating
  };
};

export default connect(mapStateToProps)(PatientSearch);
