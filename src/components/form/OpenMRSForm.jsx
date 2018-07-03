import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';


const OpenMRSForm = (props) => {

  const { handleSubmit } = props;

  const onSubmit = (values) => {
    props.dispatch(formActions.formSubmitted(values, props.patient, props.encounterType, props.visit, props.formSubmittedActionCreator));
  };

  return (
    <Form horizontal onSubmit={handleSubmit(onSubmit)}>
      {props.children}
    </Form>
  );
};

export default connect()(reduxForm({
  form: 'openmrs-form' // TODO need to figure out how to make this unique!
})(OpenMRSForm));





/*
TODO probably remove this
const { pristine, reset, submitting, children } = props;

// TODO is this sketchy...? :)
const childrenWithProps = React.Children.map(children, child =>
  React.cloneElement(child, child.type !== null && typeof child.type === 'function' ? { pristine, reset, submitting } : {}));
*/
