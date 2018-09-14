import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';
import { DATA_TYPES } from '../../domain/concept/constants';

class EncounterForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {

    if (this.props.encounter && this.props.encounter.obs) {

      // TODO update this to handle using form and namespacing
      // TODO update to handle coded obs

      let initialData = this.props.encounter.obs
        .filter((o) => o.comment && o.comment.includes("^") && o.concept && o.concept.uuid && o.value)      // filter out any obs with missing information
        .map((o) => ({                                                                                      // map to the key/value pair
          [`obs|path=${o.comment.split('^')[1]}|concept=${o.concept.uuid}`]:
            (o.concept.datatype && (o.concept.datatype.uuid === DATA_TYPES['coded'].uuid || o.concept.datatype.uuid === DATA_TYPES['boolean'].uuid)
              ? o.value.uuid : o.value)
        }))
        .reduce(function(acc, item) {                                                                  // reduce array to single object
          var key = Object.keys(item)[0];
          acc[key] = item[key];
          return acc;
        }, {});

      this.props.initialize(initialData);
    }

  }

  onSubmit(values) {
    this.props.dispatch(formActions.formSubmitted({
      values: values,
      formId: this.props.formId,
      patient: this.props.patient,
      encounterType: this.props.encounterType,
      visit: this.props.visit,
      formSubmittedActionCreator: this.props.formSubmittedActionCreator
    }));
  };

  render() {

    const { handleSubmit } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
        {this.props.children}
      </Form>
    );
  };
}

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
