import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { endOfDay } from 'date-fns';
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';
import validators from '../../features/form/validations';

const maxDateRange = validators.maxDateValue(endOfDay(new Date()));

const EncounterDate = (props) => {
  return (
    <Field
      component={CustomDatePicker}
      defaultDate={props.defaultDate}
      displayValue={props.value}
      id={props.id}
      mode={props.formContext.mode}
      name="encounter-datetime"
      validate={[maxDateRange]}
    />
  );
};

const mapStateToProps = (state, props) => {
  return {
    value: props.formContext ? props.formContext.selector(state, `encounter-datetime`) : null
  };
};

export default withFormContext(connect(mapStateToProps)(EncounterDate));


