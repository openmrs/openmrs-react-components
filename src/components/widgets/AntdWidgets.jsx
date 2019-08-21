import React from "react";
import PropTypes from 'prop-types';

import { Form,  DatePicker, Select as ASelect, Option as AOption, Switch as ASwitch, Slider as ASlider, InputNumber as AInputNumber } from "antd";

const FormItem = Form.Item;


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
