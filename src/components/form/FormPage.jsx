import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { OpenMRSForm } from './OpenMRSForm';
import { actions as toastrActions } from 'react-redux-toastr';

let FormPage = (props) => {

  // https://github.com/diegoddox/react-redux-toastr
  const formSubmittedActionCreators = [
    () => toastrActions.add({ title: "Data Saved", type: "success" }),
    () => push(props.afterSubmitLink)
  ];

  const labelStyles = {
    marginTop: '0px'
  };

  return (
    <div>
      <Grid>
        <Row>
          <Col sm={2}>
            <Link to={props.backLink}>
              <Button bsSize='large' bsStyle='danger'>
                Back
              </Button>
            </Link>
          </Col>
          <Col sm={6}><h1 style={ labelStyles }><Label>{props.title}</Label></h1></Col>
        </Row>
      </Grid>
      <div>
        <OpenMRSForm
          formId={ props.formId }
          encounterType={props.encounterType}
          formSubmittedActionCreator={formSubmittedActionCreators}
          patient={props.patient}
          visit={props.patient ? props.patient.visit : null}
        >
          { props.formContent }
        </OpenMRSForm>
      </div>
    </div>
  );
};

FormPage.propTypes = {
  afterSubmitLink: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  visit: PropTypes.object
};


export default FormPage;
