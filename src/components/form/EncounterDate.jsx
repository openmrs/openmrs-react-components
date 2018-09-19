import React from 'react';
import { Field } from 'redux-form';
import CustomDatePicker from '../widgets/CustomDatePicker';

// TODO:  Note, this does not yet work!

// TODO: validation, not in future
const EncounterDate = (props) => {
  return (
    <Field
      name='encounterDate'
      component={ CustomDatePicker }
    />
  );
};

export default EncounterDate;
