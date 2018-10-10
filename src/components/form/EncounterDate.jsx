import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import moment from 'moment';
import { DATE_FORMAT } from "../../constants";
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';
import validators from '../../features/form/validations';

const maxDateRange = validators.maxDateValue(moment().endOf('day'));

const EncounterDate = (props) => {

  if (props.context.mode === 'edit') {
    return (
      <Field
        name="encounter-datetime"
        component={CustomDatePicker}
        validate={[maxDateRange]}
      />
    );
  }
  else {
    return(
      <span>{moment(new Date(props.value)).format(DATE_FORMAT)}</span>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    value: props.context ? props.context.selector(state, `encounter-datetime`) : null
  };
};

export default withFormContext(connect(mapStateToProps)(EncounterDate));


