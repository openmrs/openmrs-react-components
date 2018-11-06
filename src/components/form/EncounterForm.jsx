import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { Form } from 'reactstrap';
import * as R from 'ramda';
import FormContext from './FormContext';
import { formActions } from '../../features/form';
import { DATA_TYPES } from '../../domain/concept/constants';
import formUtil from '../../features/form/util';

// TODO extract out utility methods for a making a obs template
// TODO think about anything we need to do to handle

class EncounterForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    // if we've loaded an encounter or any default values, re-initialize
    if ((!prevProps.encounter && this.props.encounter)
      || ( !formUtil.areEqual(this.props.defaultValues, prevProps.defaultValues)) ) {
      this.initialize();
    }

  };

  initialize() {

    let existingValues = {};
    let defaultValues = {};

    // if there is an existing encounter, create object of existing obs values
    if (this.props.encounter && this.props.encounter.obs) {

      // TODO update this to handle using form and namespacing
      existingValues = formUtil.flattenObs(this.props.encounter.obs)
        .filter((o) => o.comment && o.comment.includes("^") && o.concept && o.concept.uuid && o.value)      // filter out any obs with missing information
        .map((o) => ({                                                                                      // map to the key/value pair
          [formUtil.obsFieldName(o.comment.split('^').slice(1).join('^'), o.conceptPath)]:
            (o.concept.datatype && (o.concept.datatype.uuid === DATA_TYPES['coded'].uuid || o.concept.datatype.uuid === DATA_TYPES['boolean'].uuid)
              ? o.value.uuid : o.value)
        }))
        .reduce((acc, item) => {                                                                  // reduce array to single object
          var key = Object.keys(item)[0];
          acc[key] = item[key];
          return acc;
        }, {});

      // add in the encounter date
      existingValues["encounter-datetime"] = this.props.encounter.encounterDatetime;
    }

    // if there are any default values, create an object of default values
    if (this.props.defaultValues) {
      defaultValues = this.props.defaultValues
        .filter((v) => v.type === 'obs')   //  only supporting obs at this point
        .map((v) => ({
          [formUtil.obsFieldName(v.path, v.conceptPath ? v.conceptPath : v.concept)]: v.value
        }))
        .reduce(formUtil.arrayToObjectReducer, {});
    }

    this.initialData = Object.assign(defaultValues, existingValues); // merge the two objects, prioritizing existing values if there are overlaps
    this.props.initialize(this.initialData);
  }

  onSubmit(values) {
    this.props.dispatch(formActions.formSubmitted({
      values: values,
      formId: this.props.formId,
      formInstanceId: this.props.formInstanceId,
      patient: this.props.patient,
      encounter: this.props.encounter,
      encounterRole: this.props.encounterRole ? this.props.encounterRole : null,
      encounterType: this.props.encounterType,
      location: this.props.location ? this.props.location :
        this.props.sessionLocation ? this.props.sessionLocation : null,
      provider: this.props.provider ? this.props.provider :
        this.props.currentProvider ? this.props.currentProvider : null,
      visit: this.props.visit,
      visitType: this.props.visitType,
      formSubmittedActionCreator: this.props.formSubmittedActionCreator
    }));
  };

  render() {

    const { blur, handleSubmit, mode, reset, submitting, formInstanceId, valid } = this.props;

    // see: https://tickets.pih-emr.org/browse/WOR-173
    // horrible hack used to get around: https://github.com/erikras/redux-form/issues/3466
    // workaround taken from: https://github.com/modysseus/redux-registration-form-validation
    // hopefully, we can eventually remove the this and the _validate field below
    const customReset = () => {
      return reset() && blur('_validate', Math.random());
    };

    const context = {
      mode: mode,
      reset: customReset,
      selector: formValueSelector(formInstanceId),
      submitting: submitting,
      valid: valid
    };

    return (
      <Form horizontal onSubmit={handleSubmit(this.onSubmit)}>
        <FormContext.Provider value={context} >
          {this.props.children}
          <Field
            name="_validate"
            type="text"
            component={() => <div style={{ display: 'none' }} />}
            label=""
          />
        </FormContext.Provider>
      </Form>
    );
  };
}


EncounterForm.propTypes = {
  defaultValues: PropTypes.array,
  encounter: PropTypes.object,
  encounterRole: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]),
  encounterType: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  formId: PropTypes.string.isRequired,
  formInstanceId: PropTypes.string.isRequired,
  formSubmittedActionCreator: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func]),
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]),
  mode: PropTypes.string.isRequired,
  patient: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  provider: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]),
  visit: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]),
  visitType: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string])
};

EncounterForm.defaultProps = {
  mode: 'edit'
};


const mapStateToProps = (state, props) => {
  return {
    // note that this actually just maps a prop within the form, doesn't interact with state?
    form: props.formInstanceId ? props.formInstanceId : 'openmrs-form',
    sessionLocation: R.path(['openmrs', 'session', 'sessionLocation'], state),
    currentProvider: R.path(['openmrs', 'session', 'currentProvider'], state)

  };
};

export default connect(mapStateToProps)(reduxForm()(EncounterForm));


