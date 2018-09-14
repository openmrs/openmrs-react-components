import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions as toastrActions } from 'react-redux-toastr';
import Submit from './Submit';
import EncounterForm from './EncounterForm';
import encounterByEncounterTypeFilter from '../../domain/encounter/filters/encountersByEncounterTypeFilter';

/**
 * Provides a basic wrapper around an Encounter Form with a title, toast success message, and afterSubmitLink
 */

// TODO extract styles out to a common location once we figure out our strategy for css?
// TODO or potentially assign defaults here but allow to be overridden via props?

const rowStyles = {
  backgroundColor: '#ffa500b3'
};

const littlePaddingLeft = {
  paddingLeft: '20px'
};

const divContainer = {
  paddingLeft: '0px',
  paddingRight: '0px'
};

const colHeight = {
  height: '40px'
};

let EncounterFormPage = (props) => {

  let encounter;

  // https://github.com/diegoddox/react-redux-toastr
  const formSubmittedActionCreators = [
    () => toastrActions.add({ title: "Data Saved", type: "success" }),
    () => push(props.afterSubmitLink)
  ];

  // TODO we may not *always* want to pull in the encounter here?  make a flag about this?
  // TODO what if there are multiple encounters of the same type?  this currently just shifts in the "first"
  if (props.patient && props.patient.visit && props.patient.visit.encounters) {
    encounter = encounterByEncounterTypeFilter(props.encounterType.uuid)(props.patient.visit.encounters).shift();
  }

  return (
    <div style={divContainer}>
      <Grid style={divContainer}>
        <Row style={rowStyles}>
          <Col sm={20} md={20} style={littlePaddingLeft}>
            <span><h1>{props.title}</h1></span>
          </Col>
        </Row>
        <Row>
          <Col sm={20} md={20} style={ colHeight }>
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>
      </Grid>
      <div>
        <EncounterForm
          formId={ props.formId }
          encounter={encounter}
          encounterType={props.encounterType}
          formSubmittedActionCreator={formSubmittedActionCreators}
          patient={props.patient}
          visit={props.patient ? props.patient.visit : null}
        >
          { props.formContent }
          <Grid>
            <Row>
              <Col sm={2} xsOffset={2}>
                <Link to={ props.backLink }>
                  <Button bsSize="large">Cancel</Button>
                </Link>
              </Col>
              <Col sm={2} xsOffset={1}>
                <Submit/>
              </Col>
            </Row>
          </Grid>
        </EncounterForm>
      </div>
    </div>
  );
};

EncounterFormPage.propTypes = {
  afterSubmitLink: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  visit: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  };
};

export default connect(mapStateToProps)(EncounterFormPage);
