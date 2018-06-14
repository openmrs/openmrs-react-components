import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';


const OpenMRSForm = (props) => {


  /*
  TODO probably remove this
  const { pristine, reset, submitting, children } = props;

  // TODO is this sketchy... :)
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, child.type !== null && typeof child.type === 'function' ? { pristine, reset, submitting } : {}));
*/

  const handleSubmit = (values) => {
    values.preventDefault(); // TODO why do we need this? try removing later?
    props.dispatch(formActions.formSubmitted(values, props.patient, props.encounterType, props.visit));
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


