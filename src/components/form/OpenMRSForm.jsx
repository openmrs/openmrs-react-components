import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';


const OpenMRSForm = (props) => {

  const handleSubmit = (values) => {
    values.preventDefault(); // TODO why do we need this? try removing later?
    props.dispatch(formActions.formSubmitted(values,props.patient, props.encounterType));
  };

  return (
    <Form horizontal onSubmit={handleSubmit}>
      {props.children}
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'openmrs-form' // TODO need to figure out how to make this unique!
})(OpenMRSForm));


