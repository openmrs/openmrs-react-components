import React, { Component } from 'react';
import DataGrid from "../grid/DataGrid";
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';

const PatientSearch = props => {
    const { pristine, reset, submitting } = props;

    const handleSubmit = () => {
        console.log("handleSubmit");
    }

    return(
        <form onSubmit={handleSubmit}>
            <Grid>
                <Row>
                    <Col>
                        <label>Search: </label>
                        <Field
                            component="input"
                            name="query"
                            type="text"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ButtonToolbar>
                            <Button
                                bsStyle="success"
                                disabled={pristine || submitting}
                                type="submit"
                            >
                                Search
                            </Button>
                            <Button
                                bsStyle="danger"
                                disabled={pristine || submitting}
                                onClick={reset}
                            >
                                Clear Values
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Grid>
        </form>
    );

}

PatientSearch.propTypes = {
    representation: PropTypes.string.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

PatientSearch.defaultProps = {
    representation: "custom:(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))"
}


export default reduxForm({
    form: 'search-form' // a unique identifier for this form
})(PatientSearch);