import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';


const EncounterForm = (props) => {

  const { handleSubmit } = props;

  const onSubmit = (values) => {
    props.dispatch(formActions.formSubmitted(values, props.formId, props.patient, props.encounterType, props.visit, props.formSubmittedActionCreator));
  };

  return (
    <Form horizontal onSubmit={handleSubmit(onSubmit)}>
      {props.children}
    </Form>
  );
};

const mapStateToProps = (state, props) => {
  return {
    form: props.formId ? props.formId : 'openmrs-form'
  };
};
export default connect(mapStateToProps)(reduxForm({
  enableReinitialize: true
})(EncounterForm));





/*
TODO probably remove this
const { pristine, reset, submitting, children } = props;

// TODO is this sketchy...? :)
const childrenWithProps = React.Children.map(children, child =>
  React.cloneElement(child, child.type !== null && typeof child.type === 'function' ? { pristine, reset, submitting } : {}));
*/
