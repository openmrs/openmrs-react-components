import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {  PATIENT_SEARCH_ACTIONS } from "../../actions/types";
import PatientSearchForm from './PatientSearchForm';
import DataGrid from "../grid/DataGrid";

class PatientSearch extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(values) {
        this.props.dispatch({
            type: PATIENT_SEARCH_ACTIONS.REQUESTED ,
            query: values.query,
            representation: this.props.representation
        });
    };

    render() {

        return(
            <div>
                <PatientSearchForm onSubmit={this.handleSubmit} />
             </div>
        );
    }
}

PatientSearch.propTypes = {
    representation: PropTypes.string.isRequired
};

PatientSearch.defaultProps = {
    representation: "custom:(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))"
};

const mapStateToProps = (state) => {
    return {
        dispatch: state.dispatch,
        results: state.openmrs.patientSearch
    };
};

export default connect(mapStateToProps)(PatientSearch);
