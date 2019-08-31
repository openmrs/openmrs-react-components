import React from "react";
import PropTypes from 'prop-types';


import Form from 'antd/es/form';
import 'antd/es/form/style';

import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style';

import ASelect from 'antd/es/select';
import 'antd/es/select/style';

import ASwitch from 'antd/es/switch';
import 'antd/es/switch/style';

import ASlider from 'antd/es/slider';
import 'antd/es/slider/style';

import AInputNumber from 'antd/es/input-number';
import 'antd/es/input-number/style';

const FormItem = Form.Item;
const AOption = ASelect.Option;


// Convert the Components from Antd into Form Items

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      label={label}
      validateStatus={hasError ? "error" : "success"}
    >
      <Component 
        {...input}
        {...rest}
        children={children}
      />
    </FormItem>
  );
};



const ARangePicker = DatePicker.RangePicker;

export const Select = makeField(ASelect);
export const Option = makeField(AOption);

export const RangePicker = makeField(ARangePicker);
export const Switch = makeField(ASwitch);
export const Slider = makeField(ASlider);
export const InputNumber = makeField(AInputNumber);

makeField.propTypes = {
  children: PropTypes.object,
  hasFeedback: PropTypes.bool,
  input: PropTypes.string,
  label: PropTypes.string,

};
