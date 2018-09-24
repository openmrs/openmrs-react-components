import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form } from 'react-bootstrap';
import { formActions } from '../../features/form';
import { DATA_TYPES } from '../../domain/concept/constants';

// TODO extract out utility methods for a making a obs template
// TODO think about anything we need to do to handle

export const EncounterFormContext = React.createContext(null);

class EncounterForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {

    let existingValues = {};
    let defaultValues = {};

    // if there is an existing encounter, create object of existing obs values
    if (this.props.encounter && this.props.encounter.obs) {

      // TODO update this to handle using form and namespacing
      existingValues = this.props.encounter.obs
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
    }

    // if there are any default values, create an object of default values
    if (this.props.defaultValues) {
      defaultValues = this.props.defaultValues
        .map((v) => ({
          [`${v.type}|path=${v.path}|concept=${v.concept}`]: v.value
        }))
        .reduce(function(acc, item) {                                                                  // reduce array to single object
          var key = Object.keys(item)[0];
          acc[key] = item[key];
          return acc;
        }, {});
    }

    this.initialData = Object.assign(defaultValues, existingValues); // merge the two objects, prioritizing existing values if there are overlaps
    this.props.initialize(this.initialData);
  }

  onSubmit(values) {
    this.props.dispatch(formActions.formSubmitted({
      values: values,
      formId: this.props.formId,
      patient: this.props.patient,
      encounter: this.props.encounter,
      encounterType: this.props.encounterType,
      visit: this.props.visit,
      formSubmittedActionCreator: this.props.formSubmittedActionCreator
    }));
  };

  render() {

    const { handleSubmit, mode } = this.props;

    const context = {
      mode: mode,
      initialData: this.initialData
    };

    return (
      <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
        <EncounterFormContext.Provider value={context} >
          {this.props.children}
        </EncounterFormContext.Provider>
      </Form>
    );
  };
}


EncounterForm.propTypes = {
  defaultValues: PropTypes.array,
  encounter: PropTypes.object,
  encounterType: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  formId: PropTypes.string.isRequired,
  formSubmittedActionCreator: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func]),
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  patient: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  visit: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string])
};

EncounterForm.defaultProps = {
  mode: 'edit'
};


// note that this actually just maps a prop within the form, doesn't interact with state?
const mapStateToProps = (state, props) => {
  return {
    form: props.formId ? props.formId : 'openmrs-form'
  };
};

export default connect(mapStateToProps)(reduxForm()(EncounterForm));





/*
TODO probably remove this
const { pristine, reset, submitting, children } = props;

// TODO is this sketchy...? :)
const childrenWithProps = React.Children.map(children, child =>
  React.cloneElement(child, child.type !== null && typeof child.type === 'function' ? { pristine, reset, submitting } : {}));
*/
